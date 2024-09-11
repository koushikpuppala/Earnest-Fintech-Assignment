export const SESSION_EXPIRE = 1000 * 60 * 60

export const VERIFICATION_EXPIRE = 1000 * 60 * 5

export const RESET_EXPIRE = 1000 * 60 * 5

export const FORGOT_EXPIRE = 1000 * 60 * 5

export const VERIFICATION_TEMPLATE = (name: string, token: string) => {
	const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`

	return `
        <div
            style="
                max-width: 400px;
                margin: 40px auto;
                padding: 20px;
                border: 1px solid #915eff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                font-family: sans-serif;
                text-align: center;
                line-height: 1.2;
                color: #151030;
                mso-border-alt: solid 1px #915eff;
                mso-text-align: center;
            ">
            <img
                src="https://koushikpuppala.com/icons/android-chrome-512x512.png"
                alt="Koushik Puppala"
                style="
                    display: block;
                    margin: 0 auto 20px;
                    max-width: 100px;
                    height: auto;
                    mso-margin-top-alt: 0;
                    mso-margin-bottom-alt: 20px;
                " />
            <p style="color: #151030; mso-line-height-rule: exactly">Dear ${name},</p>
            <p style="color: #151030; mso-line-height-rule: exactly">
                Thank you for registering! Please verify your email by clicking the button below:
            </p>
            <div style="text-align: center; margin: 30px 0">
                <a
                    href="${verificationLink}"
                    style="
                        background-color: #915eff;
                        color: #f3f3f3;
                        text-decoration: none;
                        padding: 15px 25px;
                        font-size: 16px;
                        border-radius: 8px;
                    ">
                    Verify Email
                </a>
            </div>
            <p style="color: #aaa6c3; mso-line-height-rule: exactly">
                If you did not create an account, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0; mso-border-top-alt: 1px solid #ddd" />
            <p
                style="
                    font-size: 12px;
                    color: #aaa6c3;
                    text-align: center;
                    mso-line-height-rule: exactly;
                    mso-text-align: center;
                ">
                Note: This is an automated message. Please do not reply to this email.
            </p>
        </div>
    `
}
