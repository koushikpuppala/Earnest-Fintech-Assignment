import React from 'react'

export type User = {
	id: number
	name: string
	email: string
	verified: boolean
	tasks: Tasks[]
}

export type Tasks = {
	id: string
	title: string
	description?: string
	status: string
	dueDate: string
	userId: string
	createdAt: string
	updatedAt: string
}

export type SubmitButtonProps = {
	title: string
	loadingTitle: string
	isDisabled: boolean
}

export type TaskCreateModifyComponentProps = {
	open: boolean
	setOpen: (open: boolean) => void
	selected: Tasks | null
}

export type AuthContextProps = {
	login: (email: string, password: string) => Promise<void>
	register: (name: string, email: string, password: string) => Promise<void>
	verifyEmail: (email: string) => Promise<void>
	emailVerification: (token: string) => Promise<void>
	logout: () => Promise<void>
}

export type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export type SearchParamsProps = Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>

export type ErrorPageProps = { reset: () => void }

export type GlobalErrorProps = { error: Error & { digest?: string }; reset: () => void }

export type ChildrenProps = RootLayoutProps
