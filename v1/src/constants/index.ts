export const response = (): { status: boolean; desc: string; httpStatus: number; result: object } => {
    return {
        status: true,
        desc: '',
        httpStatus: 200,
        result: {}
    };
};

export const expiresIn : number = 2 * 24 * 60 * 60;
export const expiresInMobile : number = (8 * 30) * 24 * 60 * 60;

export const login_try : object = {
    max_try: 10,
    inside_at: 600
};