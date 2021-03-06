import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MainViewRoutingModule } from "./main-view-routing.module";
import { SpinnerModule } from "../modules/spinner/spinner.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { MainViewComponent } from "./main-view.component";
import {
  PipesModule,
  StripeResolver,
  StripeService,
  AdminGuard,
} from "../common";
import { spinnerReducer } from "../store/reducers";
import { StoreModule } from "@ngrx/store";

const GUARDS: any[] = [AdminGuard];

const RESOLVERS: any[] = [StripeResolver];

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, MainViewComponent],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    SpinnerModule,
    PipesModule,
    StoreModule.forFeature("spinnerState", spinnerReducer),
  ],
  providers: [StripeService, ...RESOLVERS, ...GUARDS],
})
export class MainViewModule {}
