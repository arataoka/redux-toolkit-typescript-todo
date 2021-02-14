export type loginType = {
    authen:authenType
    isLoginView:isLoginViewType,
    profile:profileType
}

export type authenType = {
    username:string,
    password:string,
}
export type JWT = {
    refresh: string;
    access: string;
}

export type isLoginViewType = boolean;
export type profileType = {
    id:number,
    username:string
}

export type loginStateType ={
    login:loginType
}

export type taskType = {
    id: number,
    title: string,
    created_at?: string,
    updated_at?: string
}