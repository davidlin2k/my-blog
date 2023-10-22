<script>
	import { enhance } from '$app/forms';
</script>

<div>
	<form method="POST" use:enhance>
		<input type="text" name="email" placeholder="Email" required />
		<input type="password" name="password" placeholder="Password" required />

		<input type="submit" name="submit" value="Submit" />
	</form>
</div>
