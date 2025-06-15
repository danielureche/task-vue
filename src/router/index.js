/**
 * Vue Router configuration with internationalization and authentication guard.
 *
 * This router setup includes:
 * - Locale-aware routing for 'en' and 'es'.
 * - Public and protected routes.
 * - Automatic redirection based on authentication status and preferred language.
 * - i18n integration that syncs the route locale with the app locale.
 */

import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import TaskDashboard from '@/components/TaskDashboard.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import LocaleLayout from '@/components/layout/LocaleLayout.vue';

import i18n from '@/i18n/i18n'

// Default and supported locales
const defaultLocale = 'en'
const supportedLocales = ['es', 'en']

/**
 * Determines the user's preferred locale based on saved preference or browser settings.
 *
 * @returns {string} - A supported locale (either 'en' or 'es').
 */
function getPreferredLocale() {
    const savedLanguage = localStorage.getItem('userLanguage')
    if (savedLanguage && supportedLocales.includes(savedLanguage)) {
        return savedLanguage
    }

    const browserLanguage = navigator.language.substring(0, 2)
    if (supportedLocales.includes(browserLanguage)) {
        return browserLanguage
    }

    return defaultLocale
}

// Routes with locale prefix (e.g., /en/login)
const localeRoutes = {
    path: '/:locale',
    component: LocaleLayout,
    children: [
        {
            path: 'login',
            name: 'LoginWithLocale',
            component: Login
        },
        {
            path: 'register',
            name: 'RegisterWithLocale',
            component: Register
        },
        {
            path: '',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'DashboardWithLocale',
                    component: TaskDashboard
                }
            ]
        }
    ]
}

// Routes without locale prefix, fallback for default language
const defaultLocaleRoutes = {
    path: '/',
    component: LocaleLayout,
    children: [
        {
            path: 'login',
            name: 'Login',
            component: Login
        },
        {
            path: 'register',
            name: 'Register',
            component: Register
        },
        {
            path: '',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: TaskDashboard
                }
            ]
        }
    ]
}

// Main route definitions with dynamic redirect logic
const routes = [
    {
        path: '/',
        redirect: () => {
            const preferredLocale = getPreferredLocale()
            const token = localStorage.getItem('authToken')
            const isAuthenticated = !!token

            if (isAuthenticated) {
                return `/${preferredLocale}/`
            } else {
                return `/${preferredLocale}/login`
            }
        }
    },
    defaultLocaleRoutes,
    localeRoutes,
    {
        path: '/:pathMatch(.*)*',
        redirect: () => {
            const preferredLocale = getPreferredLocale()
            return `/${preferredLocale}/login`
        }
    }
]

// Create Vue Router instance
const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * Global navigation guard to:
 * - Set the current locale in i18n.
 * - Redirect unauthenticated users away from protected routes.
 * - Prevent authenticated users from accessing login/register pages.
 */
router.beforeEach((to, from, next) => {
    const locale = to.params.locale
    const currentLocale = i18n.global.locale.value

    // Set locale or fallback to default
    if (!locale) {
        if (currentLocale !== defaultLocale) {
            i18n.global.locale.value = defaultLocale
        }
    } else {
        if (!supportedLocales.includes(locale)) {
            const preferredLocale = getPreferredLocale()
            return next(`/${preferredLocale}/login`)
        }

        if (currentLocale !== locale) {
            i18n.global.locale.value = locale
        }
    }

    // Route access control
    const token = localStorage.getItem('authToken')
    const isAuthenticated = !!token
    const publicPaths = ['login', 'register']
    const cleanPath = to.path.replace(/^\/(en|es)/, '') || '/'
    const isPublicRoute = publicPaths.some(p => cleanPath.includes(p))

    if (cleanPath === '/' && !isAuthenticated) {
        return next(locale ? `/${locale}/login` : `/login`)
    }

    if (!isAuthenticated && !isPublicRoute) {
        return next(locale ? `/${locale}/login` : `/login`)
    }

    if (isAuthenticated && isPublicRoute) {
        return next(locale ? `/${locale}/` : `/`)
    }

    return next()
})

export default router