import { Button } from "../../shared/ui/Button";

export function LoginPage() {
    return (
        <>
            <title>Struckly - Login</title>
            <div className="p-4">
                <Button
                    onClick={() => console.log("login")}
                >Se connecter</Button>
            </div>
        </>
    )
}