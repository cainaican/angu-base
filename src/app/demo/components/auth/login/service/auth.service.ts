import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';

@Injectable()
export class AuthService {

    private _auth = inject(Auth);
    private _router = inject(Router);

    login(cred: {login: string, password: string}) {

        return from(signInWithEmailAndPassword(this._auth, cred.login, cred.password))
        .subscribe({
            next:(data) => {
                if (data) this._router.navigate(['/']);
            },
            error: () => {
            }
        })

    }
}
