import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, } from "mongoose";
import { ObjectId } from "mongodb";
import { CategoryDto, AchievementDto, UserDto } from "@points/shared";
import * as bcrypt from 'bcrypt';

import { User, Achievement, Category } from "../shared/interfaces";
import { SeedResults } from "./seed.controller";

interface SeedData {
    categories: CategoryDto[],
    achievements: AchievementDto[],
    admins: UserDto[]
}

interface SeedAudit<T> {
    missing: T[],
    existing: T[]
}

@Injectable()
export class SeedService {

    constructor(
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Achievement') private readonly achievementModel: Model<Achievement>,
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
    ) { }

    async seed(data: SeedData): Promise<SeedResults> {
        const categories = await this.seedCategories(data.categories);
        const achievements = await this.seedAchievements(data.achievements, categories);
        const users = await this.seedUsers(data.admins);

        return {
            categories: categories.length,
            achievements: achievements.length,
            users: users.length
        };
    }

    private async seedCategories(categories: CategoryDto[]): Promise<CategoryDto[]> {
        const allCategories = await this.categoryModel.find({});
        const existingCategories = [];

        const missingCategories = categories
            .filter(category => !allCategories.find(savedCategory => {
                const categoryExists = savedCategory.name.toLowerCase() === category.name.toLowerCase();
                if (categoryExists) {
                    existingCategories.push(savedCategory);
                }
                return categoryExists
            }));

        const categoryAudit: SeedAudit<CategoryDto> = {
            missing: missingCategories,
            existing: existingCategories
        };

        let newlyAddedCategories = [];

        if (categoryAudit.missing.length) {
            newlyAddedCategories = await
                this.categoryModel.insertMany(categoryAudit.missing);
        }

        return [...newlyAddedCategories, ...categoryAudit.existing];
    }

    private async seedAchievements(achievements: AchievementDto[], categories: CategoryDto[]): Promise<CategoryDto[]> {

        const allAchievements = await this.achievementModel.find({});
        const existingAchievements = [];

        const missingAchievements = achievements
            .filter(achievement => !allAchievements.find(savedAchievement => {
                const achievementExists = savedAchievement.name.toLowerCase() === achievement.name.toLowerCase();
                if (achievementExists) {
                    existingAchievements.push({
                        ...achievement,
                        id: savedAchievement.id
                    });
                }
                return achievementExists
            }));

        const achievementAudit: SeedAudit<AchievementDto> = {
            missing: missingAchievements.map(achievement => {
                const achievementCategory = categories
                    .find(category => achievement.category.toLowerCase() === category.name.toLowerCase());
                achievement.categoryId = achievementCategory.id;
                return achievement;
            }),
            existing: existingAchievements
        };

        let newlyAddedAchievements = [];
        let editedAchievements = [];

        if (achievementAudit.missing.length) {
            newlyAddedAchievements = await
                this.achievementModel.insertMany(achievementAudit.missing);
        }

        if (achievementAudit.existing.length) {
            editedAchievements = await achievementAudit.existing.reduce(async (acc, a) => {
                const category = await this.categoryModel.findOne({ name: a.category });
                return acc.then(async p => [
                    ...p,
                    await this.achievementModel.update({ _id: a.id }, {
                        ...a,
                        categoryId: category.id
                    })
                ])
            }, Promise.resolve([]))
        }

        return [...newlyAddedAchievements, ...achievementAudit.existing];
    }

    private async seedUsers(users: UserDto[]): Promise<UserDto[]> {

        const allUsers = await this.userModel.find({});
        const existingUsers = [];

        const missingUsers = users
            .filter(user => !allUsers.find(savedUser => {
                const userExists = savedUser.userName.toLowerCase() === user.userName.toLowerCase();
                if (userExists) {
                    existingUsers.push(savedUser);
                }
                return userExists
            }));

        const userAudit: SeedAudit<UserDto> = {
            missing: missingUsers.map(user => {
                const userWithPassword =
                    Object.assign(user, { password: bcrypt.hashSync(user.password, 10) });
                return userWithPassword;
            }),
            existing: existingUsers
        };

        let newlyAddedUsers = [];

        if (userAudit.missing.length) {
            newlyAddedUsers = await
                this.userModel.insertMany(userAudit.missing);
        }

        return [...newlyAddedUsers, ...userAudit.existing];
    }

}
