module.exports = {
	apps: [
		{
			name: "MainApp",
			script: "node_modules/next/dist/bin/next",
			args: "start",
			cwd: "./",
			instances: "max",
			exec_mode: "cluster",
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			instance_var: "INSTANCE_ID",
			env_development: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
