import React, { Component } from "react";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";

import { IAchievementProps } from "../containers";
import { CategoryList } from "./";


export class TabView extends Component<IAchievementProps> {
    render(): JSX.Element {
        return (
            <ScrollableTabView
                style={{ marginTop: 10, }}
                renderTabBar={() => <DefaultTabBar />}
            >
                {this.props.categories.map((category, index) =>
                    <CategoryList {...{
                        tabLabel: category.name,
                        achievements: this.props.achievementList,
                        category: category,
                        key: index
                    }}>
                    </CategoryList>)}
            </ScrollableTabView>
        );
    }
}