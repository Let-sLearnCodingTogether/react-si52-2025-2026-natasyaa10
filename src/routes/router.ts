import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : "/",
        children : [
            {
                index : true,
                lazy : {
                    Component : async () => {
                        const component = await import("../pages/auth/signup/SignUp.tsx")

                        return component.default
                    }
                }
            },
            {
                path : "signIn",
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/auth/signin/SignIn.tsx")

                        return component.default
                    }
                }
            }
        ]
    }, {

        path : "/movie", // alamat dari sebuah page
        children : [
            {
                index : true,
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/movies/Movies.tsx")
                        return component.default
                    }
                }
            },
            {
                path : "add-movie",
                index : true,
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/movies/AddMovie.tsx")
                        return component.default
                    }
                }
            }
        ]
    }
])

export default router;