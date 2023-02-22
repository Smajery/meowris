# meowris
Application for saving memories

Для запуску додатку необхідно мати середовище розробки, що підтримує язик JavaScript, а також мати на пристрої середовище для роботи з базою даних Postgresql.

По-перше, в терміналі слід перейти до папки ./meowris/server . Перед запуском сервера слід завантажити всі залежності. Для цього пропишить команду “npm i”. 
Після завершення установки, пропишіть “npm run server”. Переконайтеся, что сервер запускається на порті 5000.

По-друге, якщо в попередньому пункті все виконано успішно, слід перейти до папки ./meowris в другому терміналі, де спочатку необхідно завантажити всі залежності командою “npm i”, 
а потім запустити клієнт командою “npm run start”. На якому порту запуститься клієнт не важливо.

Для підключення бази даних необхідно створити нову базу даних. Вказуємо назву бази даних і користувача. Для управління базою даних у прикладі використовується PgAdmin

Далі переходимо до середовища розробки, там необхідно вказати назву, користувача та пароль бази даних у файлі db.js. Порт змінюємо на “5432”, якщо не змінювали його у СУБД.

Далі для заповнення бази даних необхідними таблицями користуємося спеціальною функцією і головному файлі index.js. Важливий момент! Цей шматочок кода необхідно використати лише 1 раз, 
а потім знов закоментувати, бо на початку свого виконання функція видаляє всі дані з бази даних

База вже підключена і працездатна, але для зручності її можна наповнити заздалегідь підготовленими даними. До цього копіюємо вміст файлу dbData.sql та запустимо його в запроснику СУБД.

Приємного використання!

Окрема подяка https://github.com/kirrikesha за back-end та ілюстрації.

-------------------------------------------------------------------------------------------------------------------------------------------------------

To run the application, you need to have a development environment that supports the JavaScript language and also have a Postgresql database environment on your device.

First, navigate to the ./meowris/server folder in the terminal. Before starting the server, install all dependencies by running the "npm i" command.
After the installation is complete, run "npm run server". Make sure that the server is running on port 5000.

Second, if the previous step is completed successfully, navigate to the ./meowris folder in another terminal, where you need to install all dependencies by running the "npm i" command,
and then start the client by running the "npm run start" command. It doesn't matter on which port the client will run.

To connect to the database, create a new database. Specify the name of the database and the user. PgAdmin is used to manage the database in the example.

Next, go to the development environment, where you need to specify the name, user, and password of the database in the db.js file. Change the port to "5432" if you haven't changed it in the DBMS.

Next, to populate the database with the necessary tables, use a special function in the main index.js file. Important! This piece of code should only be used once,
and then commented out again because the function deletes all data from the database at the beginning of its execution.

The database is already connected and operational, but for convenience, it can be filled with prepared data in advance. To do this, copy the contents of the dbData.sql file and run it in the DBMS query tool.

Enjoy using it!

Special thanks to https://github.com/kirrikesha for the back-end and illustrations.
