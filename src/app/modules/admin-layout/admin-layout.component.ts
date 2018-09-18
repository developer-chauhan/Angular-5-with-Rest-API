import {
    Component,
    OnInit,
    ChangeDetectorRef,
    NgZone,
    Renderer,
    ElementRef,
    ViewChild
} from '@angular/core';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css'],
    providers: [AuthService]
})

export class AdminLayoutComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    @ViewChild('progressBar')
    progressBar: ElementRef;

    constructor(
        private authService: AuthService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public dialog: MatDialog,

        private router: Router,
        private ngZone: NgZone,
        private renderer: Renderer
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        router.events.subscribe((event: RouterEvent) => {
            this._navigationInterceptor(event)
        });
    }

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }
    logout() {
        this.authService.logout();
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.ngZone.runOutsideAngular(() => {
                this.renderer.setElementStyle(
                    this.progressBar.nativeElement,
                    'opacity',
                    '1'
                )
            })
        }
        if (event instanceof NavigationEnd) {
            setTimeout(() => {
                this._hideProgressBar();
            }, 1000);
        }
        if (event instanceof NavigationCancel) {
            setTimeout(() => {
                this._hideProgressBar();
            }, 1000);
        }
        if (event instanceof NavigationError) {
            setTimeout(() => {
                this._hideProgressBar();
            }, 1000);
        }
    }
    private _hideProgressBar(): void {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setElementStyle(
                this.progressBar.nativeElement,
                'opacity',
                '0'
            )
        })
    }
}