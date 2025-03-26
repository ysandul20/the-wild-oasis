// API — це набір правил, які визначають, як фронтенд може взаємодіяти з бекендом.

# Connecting Supabase

1. Install npm install @supabase/supabase-js

2. Paste this code from Supabase to initialize

import { createClient } from '@supabase/supabase-js'  
const supabaseUrl = 'your url'
const supabaseKey = 'Add your table key'
const supabase = createClient(supabaseUrl, supabaseKey)

3. Add your table key (Project Settings => Data API => copy public key)

# databasePassword: 'rvkPDzlXhRcjLTJ5'

# GPT props

поясни основні правила та синтаксис при використанні React Hook Form
поясни основні правила та синтаксис при використанні React Query v4

# React Portal

Коли варто використовувати Portal?
✔ Модальні вікна
✔ Випадаючі списки (dropdown)
✔ Тултипи
✔ Спливаючі повідомлення (toast, notifications)

Коли Portal не потрібен?
❌ Якщо елемент не виходить за межі батьківського контейнера
❌ Якщо немає проблем з overflow або z-index

# Modal window problem

Проблема:
Якщо ви додаєте обробник події на корінь DOM, то він буде виконуватися після всіх інших подій, які спливає вгору, включаючи події натискання кнопок чи елементів всередині модалки. Це може призвести до того, що:

Ви закриваєте модалку, навіть якщо користувач натискає на елемент всередині модалки, тому що клік на Overlay (чи корінь DOM) спрацьовує після того, як спрацьовує обробник кліку на внутрішніх елементах.
В результаті модалка закривається занадто рано, до того, як буде виконана інша дія (наприклад, клік по кнопці всередині модалки).
