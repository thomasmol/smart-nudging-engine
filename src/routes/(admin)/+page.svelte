<main>
	<section class="container">
		<a href="/configurations" class="font-semibold text-blue-600 hover:underline"
			>Go to configurations to start experiments.</a>
		<h1 class="mb-6 mt-4 text-3xl font-bold">How to use the Smart Nudging Engine</h1>

		<p class="mb-4">The Smart Nudging Engine can be used to do three main things:</p>

		<ul class="ml-6 mb-4 list-disc">
			<li>
				<strong>Measuring effectiveness</strong>: Metrics such as click rate, view time, and
				self-report are used to measure the effectiveness of a nudge.
			</li>
			<li>
				<strong>Finding optimal nudge</strong>: Algorithms like recommender systems and
				reinforcement learning help find the best nudge for each nudgee or group.
			</li>
			<li>
				<strong>Generating nudge</strong>: Models like GPT-4, Dall-E, and Stable Diffusion are used
				to generate nudges based on provided components.
			</li>
		</ul>

		<p class="mb-4">There are three use cases for the Smart Nudging Engine:</p>

		<h2 class="mb-4 text-xl font-bold">
			1. When the user provides <strong>1</strong> <em>nudge</em>:
		</h2>

		<ul class="ml-6 mb-4 list-disc">
			<li>
				The engine measures the nudge's effectiveness using metrics like click rate, view time, and
				self-report.
			</li>
			<li>
				The user can make informed decisions on whether to continue using the nudge or make changes
				to improve its effectiveness.
			</li>
		</ul>

		<h2 class="mb-4 text-xl font-bold">
			2. When the user provides <strong>n</strong> <em>nudges</em>:
		</h2>

		<ul class="ml-6 mb-4 list-disc">
			<li>The engine measures the effectiveness of each nudge.</li>
			<li>
				The engine finds the optimal nudge for each nudgee or group.
				<ul class="ml-6 mb-2 list-disc">
					<li>
						Users can do this <strong>manually</strong> by assigning nudges to different groups and using
						metric values and actions to calculate effectiveness.
					</li>
					<li>
						Alternatively, users can do this <strong>automatically</strong> using weights and algorithms
						like recommender systems and reinforcement learning.
					</li>
				</ul>
			</li>
		</ul>

		<h2 class="mb-4 text-xl font-bold">
			3. When the user provides <strong>n</strong> <em>nudge components</em>:
		</h2>

		<ul class="ml-6 mb-4 list-disc">
			<li>The engine generates different nudges.</li>
			<li>The engine measures the effectiveness of each nudge.</li>
			<li>The engine finds the optimal nudge for each nudgee or group.</li>
		</ul>

		<p class="mb-4">To add data to the database, follow this order:</p>

		<ol class="ml-6 mb-4 list-decimal">
			<li>Metric types</li>
			<li>Nudgees</li>
			<li>Groups</li>
			<li>Configurations</li>
		</ol>

		<p class="mb-4">
			The order for pre-made or generated nudges, config, or nudges may vary. After completing these
			steps, add actions and assign nudges to nudgees.
		</p>
	</section>
</main>
