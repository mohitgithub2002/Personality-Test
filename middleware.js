export {default} from "next-auth/middleware"

export const config = {
    matcher: ["/dashboard", "/personality-test"]
}

//Note: Mention all protected page routes in the matcher array.