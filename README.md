<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Start_Laravel_project_0"></a>Start Laravel project</h1>
<h3 class="code-line" data-line-start=3 data-line-end=4 ><a id="Copy_envexample_to_your_project_3"></a>Set rights to the user</h3>
<pre><code class="has-line-data" data-line-start="6" data-line-end="8" class="language-sh">sudo chown -R $USER:$USER ~/laravel-app
</code></pre><h3 class="code-line" data-line-start=3 data-line-end=4 ><a id="Copy_envexample_to_your_project_3"></a>Copy .env.example to your project</h3>
<pre><code class="has-line-data" data-line-start="6" data-line-end="8" class="language-sh">cp .env.example .
</code></pre>
<p class="has-line-data" data-line-start="8" data-line-end="9">Set <code>DB_HOST</code> in .env file as DB <code>container_name</code></p>
<h3 class="code-line" data-line-start=10 data-line-end=11 ><a id="Start_docker_containers_10"></a>Start docker containers</h3>
<pre><code class="has-line-data" data-line-start="12" data-line-end="18" class="language-sh">docker-compose up <span class="hljs-operator">-d</span>

docker-compose <span class="hljs-built_in">exec</span> app php artisan key:generate

docker-compose <span class="hljs-built_in">exec</span> app php artisan config:cache
</code></pre>
<h3 class="code-line" data-line-start=19 data-line-end=20 ><a id="Create_MYSQL_user_19"></a>Create MYSQL user</h3>
<pre><code class="has-line-data" data-line-start="21" data-line-end="28">docker-compose exec db bash

mysql -u root -p

GRANT ALL ON laravel.* TO 'laraveluser'@'%' IDENTIFIED BY 'your_laravel_db_password';
FLUSH PRIVILEGES;
</code></pre>
``````
