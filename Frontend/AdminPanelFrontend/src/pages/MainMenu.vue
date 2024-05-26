<script setup lang="ts"></script>

<template>
	<div class="grid h-full w-full grid-cols-1 grid-rows-1">
		<div class="flex h-full w-full items-center justify-center">
			<ul class="grid h-max w-96 list-none auto-rows-max grid-cols-1">
				<li class="flex h-auto w-max">
					<router-link
						to="/integrals"
						class="h-full w-auto text-black no-underline"
					>
						Integrals
					</router-link>
				</li>
				<li>
					<p class="h-full w-auto text-surface-500 no-underline">
						Competitions
					</p>
				</li>
				<li>
					<p class="h-full w-auto text-surface-500 no-underline">Users</p>
				</li>
				<li>
					<p class="h-full w-auto text-surface-500 no-underline">Emails</p>
				</li>
			</ul>
		</div>
		<div v-if="false">
			<!--          todo: image-->
		</div>
	</div>
</template>

<style scoped lang="postcss"></style>
