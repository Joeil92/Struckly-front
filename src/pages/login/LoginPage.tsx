import { useTranslation } from "react-i18next";
import { Typography } from "../../shared/ui/Typography";

export function LoginPage() {
    const { t } = useTranslation();

    return (
        <>
            <title>{t('login.title')}</title>
            <Typography tag={"h1"} className="fixed ps-[50px] pt-[50px]">Struckly</Typography>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="grow flex items-center justify-center">
                    <div className="flex flex-col gap-4">
                        <Typography tag={"h5"}>{t('login.loginTitle')}</Typography>
                        <Typography className="text-grey-500">{t('login.loginSubtitle')}</Typography>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-primary-300 via-primary-500 to-primary-600 h-screen grow"></div>
            </div>
        </>
    )
}