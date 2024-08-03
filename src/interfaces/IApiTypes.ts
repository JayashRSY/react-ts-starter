export interface ISigninResponse {
    success: boolean
    message: string
    accessToken: string;
    data: IUser
}

export interface ISignupResponse {
    success: boolean
    message: string
}

export interface IRefreshToken {
    success: boolean
    message: string
    accessToken: string;
    data: IUser
}

export interface IGoogleResponse {
    success: boolean
    message: string
    accessToken: string;
    data: IUser
}

export interface ISignoutResponse {
    success: boolean
    message: string
}

export interface IUser {
    _id: string;
    name?: string;
    email: string;
    profilePicture?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
