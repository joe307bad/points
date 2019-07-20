import { CategoryDto } from '../dtos';

export interface ICategoryService {
    create(category: CategoryDto): Promise<CategoryDto>;
    getAll(): Promise<CategoryDto[]>;
    update(category: CategoryDto): Promise<CategoryDto>;
}
