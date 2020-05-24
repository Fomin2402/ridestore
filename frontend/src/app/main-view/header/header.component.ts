import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getUserProfile } from 'src/app/store/selectors/profile.selectors';
import { LogoutUser } from 'src/app/store/actions';

@Component({
    selector: 'agencyapp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {

    isVisible!: boolean;
    user!: IUser | null;

    private subscription!: Subscription;

    constructor(private store: Store<IAppState>) { }

    get userPhoto(): string | null {
        if (this.user && this.user.photo && this.user.photo.thumbnail) {
            return this.user.photo.thumbnail;
        }
        return null;
    }
    ngOnInit(): void {
        this.subscription = this.store
            .pipe(select(getUserProfile))
            .subscribe((user: IUser | null) => {
                this.user = user;
            });
    }

    logout(): void {
        this.store.dispatch(new LogoutUser());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('document:click')
    checkIsDropDown(): void {
        this.isVisible = false;
    }

}
