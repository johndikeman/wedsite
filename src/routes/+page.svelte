<script>
  import { base } from "$app/paths";
</script>

<style>
		* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
		}

		:global(body) {
				font-family: 'Cartograph-CF', sans-serif;
				size: 200%;
				min-height: 100vh;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f5f5f5;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
		}

		.container {
				display: flex;
				width: 100vw;
				box-shadow: 0 10px 40px rgba(0,0,0,0.1);
		}

		.color-block {
				flex: 1;
				background: linear-gradient(135deg, #ff6961 0%, #ffc5d3 100%);
				padding: 60px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				color: white;
		}

		.color-block h1 {
				font-size: 48px;
				margin-bottom: 20px;
				font-weight: bold;
		}

		.color-block p {
				font-size: 18px;
				line-height: 1.6;
				margin-bottom: 30px;
		}

		.color-block button {
				background: white;
				color: #667eea;
				border: none;
				padding: 15px 30px;
				font-size: 16px;
				font-weight: bold;
				border-radius: 5px;
				cursor: pointer;
				width: fit-content;
				transition: transform 0.2s;
		}

		.color-block button:hover {
				transform: translateY(-2px);
		}

		.photo-side-1 {
				flex: 1;
				background: url('/photo1.jpg');
				/*min-height: 729.6px;*/
				background-size: contain;
				background-repeat: no-repeat;
		}

		img {
			flex: 1;
			max-width: 50vw;
		}

		.photo-side-2 {
				flex: 1;
				background: url('/photo2.jpg');
				/*min-height: 816px;*/
				background-size: contain;
				background-repeat: no-repeat;
		}

		@media (max-width: 768px) {
				.container {
						flex-direction: column;
				}
				
				.photo-side {
						min-height: 1000px;
				}
		}
</style>
<div class="container">
		<div class="color-block">
				<p>we are getting married.</p>
		</div>
		<img src="{base}/photo1.jpg"/>
</div>
<div class="container">
		<img src="{base}/photo2.jpg"/>
		<div class="color-block">
				<p>it will be described by a time, and a place in space.</p>
		</div>
</div>
