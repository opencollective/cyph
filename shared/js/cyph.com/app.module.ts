/* tslint:disable:no-import-side-effect no-reference */

/// <reference path="../typings/index.d.ts" />

import '../standalone/global';

import 'hammerjs';
import 'jquery';
import 'jquery.appear';
import '../standalone/init';
import '../standalone/translations';
import './sham';

import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BetaRegisterComponent} from '../cyph/components/beta-register.component';
import {CheckoutComponent} from '../cyph/components/checkout.component';
import {ClaimUsernameComponent} from '../cyph/components/claim-username.component';
import {CyphCommonModule} from '../cyph/modules/cyph-common.module';
import {CyphWebModule} from '../cyph/modules/cyph-web.module';
import {PotassiumService} from '../cyph/services/crypto/potassium.service';
import {DatabaseService} from '../cyph/services/database.service';
import {DialogService} from '../cyph/services/dialog.service';
import {HtmlSanitizerService} from '../cyph/services/html-sanitizer.service';
import {NotificationService} from '../cyph/services/notification.service';
import {resolveStaticServices} from '../cyph/util/static-services';
import {appRoutes} from './app-routes';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {DemoChatRootComponent} from './demo-chat-root.component';
import {DemoComponent} from './demo.component';
import {DemoService} from './demo.service';
import {MockDatabaseService} from './mock-database.service';
import {MockHtmlSanitizerService} from './mock-html-sanitizer.service';
import {MockPotassiumService} from './mock-potassium.service';
import {RouterComponent} from './router.component';
import {SilentNotificationService} from './silent-notification.service';


/**
 * Angular module for Cyph home page.
 */
@NgModule({
	bootstrap: [RouterComponent],
	declarations: [
		AppComponent,
		BetaRegisterComponent,
		DemoChatRootComponent,
		CheckoutComponent,
		ClaimUsernameComponent,
		DemoComponent,
		RouterComponent
	],
	entryComponents: [
		BetaRegisterComponent
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		CyphCommonModule,
		CyphWebModule,
		MatSidenavModule,
		MatToolbarModule
	],
	providers: [
		AppService,
		DemoService,
		{
			provide: DatabaseService,
			useClass: MockDatabaseService
		},
		{
			provide: HtmlSanitizerService,
			useClass: MockHtmlSanitizerService
		},
		{
			provide: NotificationService,
			useClass: SilentNotificationService
		},
		{
			provide: PotassiumService,
			useClass: MockPotassiumService
		}
	]
})
export class AppModule {
	constructor (
		domSanitizer: DomSanitizer,
		httpClient: HttpClient,
		dialogService: DialogService
	) {
		resolveStaticServices(dialogService, domSanitizer, httpClient);
	}
}
