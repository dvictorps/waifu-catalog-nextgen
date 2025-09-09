"use client";

import { api } from "~/trpc/react";

export default function Home() {
	const syncMutation = api.waifu.sync.useMutation({
		onSuccess: (data) => {
			console.log("Sincronização concluída:", data);
		},
		onError: (error) => {
			console.error("Erro na sincronização:", error);
		},
	});

	const handleSync = () => {
		syncMutation.mutate({ startPage: 1 });
	};

	return (
		<div className="p-52">
			<button
				onClick={handleSync}
				disabled={syncMutation.isPending}
				className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
				type="button"
			>
				{syncMutation.isPending ? "Sincronizando..." : "Iniciar Sincronização"}
			</button>

			{syncMutation.data && (
				<p className="mt-4 text-green-600">
					Sincronização concluída: {syncMutation.data.processed} waifus
					processadas
				</p>
			)}

			{syncMutation.error && (
				<p className="mt-4 text-red-600">Erro: {syncMutation.error.message}</p>
			)}
		</div>
	);
}
