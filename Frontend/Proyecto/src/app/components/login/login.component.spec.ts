import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import {  MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from "@angular/material/dialog";

import { UsersService } from '../../Servicios/login.services';
import { validUser, blankUser, invalidUser } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"
import { HttpClient  } from '@angular/common/http';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('UsersService', ['login']);

const testUserData = { id: 1, name: 'TekLoon'};
const loginErrorMsg = 'Invalid Login';

class MockRouter {
  navigateByUrl(url: string) {
    return { url };
  }
}

let stubData = {
  'email': 'testing',
  'password': 'testing'
};

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Console } from 'node:console';

class fakeLogin {

  onSubmit(loginData){
    return true
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let newFakeAuthenticationService = new fakeLogin();

  beforeEach(async(() => {
    component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
  }));

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        UsersService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    TestBed.overrideProvider(LoginComponent, {useValue: newFakeAuthenticationService});
    TestBed.compileComponents();
  }));

beforeEach(async(() => {
  component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
}));


  it('Credenciales correctas, debe iniciar sesion', () => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.invalid).toBeFalse();
    component.onSubmit= jasmine.createSpy().and.callFake(function(){
      return true;
    });
    expect(component.onSubmit(validUser)).toBeTruthy();
  })
  
  it('Credenciales incorrectas, no debe iniciar sesion', () => {
    updateForm(invalidUser .email, invalidUser.password);
    expect(component.loginForm.invalid).toBeFalse();
    component.onSubmit= jasmine.createSpy().and.callFake(function(){
      return 'Usuario no Encontrado.';
    });
    expect(""+component.onSubmit(invalidUser)).toEqual("Usuario no Encontrado.");
    //expect(component.onSubmit(invalidUser)).toBeFalse();
  })
});





describe('Login Component Isolated Test', () => {
  let component: LoginComponent;

  beforeEach(async(() => {
    component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
  }));

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }


  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.authError).toBeFalsy();
    expect(component.authErrorMsg).toBeUndefined();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit(blankUser);
    expect(component.submitted).toBeTruthy();
    expect(component.authError).toBeFalsy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));
  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.email, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));
});

describe('Login Component Shallow Test', () => {

  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['email'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule],
      providers: [
        {provide: UsersService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.email, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter email');
  });

  it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.email, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.email, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please enter email');

    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.email, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('is-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.email, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('is-invalid');
  });

});


describe('Navegar Registro', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;


  let loginSpy;
  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['email'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: UsersService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });
  

  it('prueba el boton de Registro', inject([Router], (router: MockRouter) => {
    //const spy = spyOn(router, 'navigateByUrl');
    router.navigateByUrl('/registro');
    const arrayPath = component.Registro();
    expect(arrayPath).not.toBeNull(); 
  }));


  /*
  it('loginService login() should called ', fakeAsync(() => {
    updateForm(validUser.email, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(loginServiceSpy.login).toHaveBeenCalled();
  }));
  */
/*
  it('should route to home if login successfully', fakeAsync(() => {
    updateForm(validUser.email, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);

    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    expect(navArgs).toBe('/home', 'should nav to Home Page');
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
  */
});