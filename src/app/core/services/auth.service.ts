import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(loginData: IUser) {
    return this.http.post('/user/login', {
      "email": loginData.email,
      "password": loginData.password
    })
  }

  update(updateData: IUser, imageFile: File) {
    if (updateData.profilePicture) {
      const updateformData = new FormData();
      updateformData.append('name', updateData.name);
      updateformData.append('email', updateData.email);
      updateformData.append('profilePicture', imageFile, imageFile.name);

      return this.http.put('/user/updatepicture', updateformData)

    } else {
      return this.http.put('/user/update', updateData)
    }
  }

  signup(signupData: IUser, imageFile: File) {

    const formData = new FormData();
    formData.append('name', signupData.name);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('role', signupData.role);
    formData.append('profilePicture', imageFile, imageFile.name);

    return this.http.post('/user/signup', formData)
  }

  getAllusers() {
    return this.http.get('/user/getAll')
  }
}
