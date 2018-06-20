
import { NavigationActions, NavigationParams, NavigationRoute, NavigationNavigateAction } from 'react-navigation';

let container: any = {};

function setContainer(navContainer: any) {
  container = navContainer;
}

function reset(routeName: string, params?: NavigationParams) {
  container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        } as NavigationNavigateAction),
      ],
    }),
  );
}

function navigate(routeName: string, params?: NavigationParams) {

  container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    } as NavigationNavigateAction),
  );
}

function navigateDeep(actions: Array<{ routeName: string, params?: NavigationParams }>) {
  container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        } as NavigationNavigateAction),
      undefined,
    ),
  );
}

function getCurrentRoute(): NavigationRoute | null {
  if (!container || !container.state.nav) {
    return null;
  }

  return container.state.nav.routes[container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
};
