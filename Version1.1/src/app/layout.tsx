import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Simulador de Dron ZD550 Forestal - Plataforma STEAM',
	description: 'Simulador de Ingeniería, Dinámica 6-DOF y Misión Forestal en Babylon.js',
};

export default function RootLayout({
	children,
}: {
    children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className="font-sans bg-slate-950 text-slate-100">{children}</body>
		</html>
	);
}
