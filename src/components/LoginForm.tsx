'client component'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useReducer } from "react"
import { useAuth } from "@/app/providers/AuthProvider"
import loginReducer, { LoginState } from "@/reducers/LoginReducer"

interface LoginProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

const initialState: LoginState = {
  credentials: { email: "", password: "" },
  error: ""
}

export function LoginForm({ onSuccess, onCancel, className }: LoginProps) {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { login, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CREDENTIAL", field: name, value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.credentials.email || !state.credentials.password) {
      dispatch({ type: "SET_ERROR", error: "Por favor completa todos los campos" });
      return;
    }

    try {
      await login(state.credentials);
      onSuccess?.();
      dispatch({ type: "RESET" });
    } catch (error) {
      console.debug(error)
      dispatch({
        type: "SET_ERROR",
        error: 'Error al intentar iniciar sesión'
      });
    }
  }
  
  
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Hola de nuevo!</CardTitle>
          <CardDescription>
            Accede a tu cuenta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    value={state.credentials.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={state.credentials.password}
                    onChange={handleInputChange}
                    required />
                </div>

                {state.error && (
                  <div className="bg-red-900/50 border border-red-500/50 rounded-md p-3">
                    <p className="text-sm text-red-300">{state.error}</p>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  Ingresar
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Regístrate
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}
