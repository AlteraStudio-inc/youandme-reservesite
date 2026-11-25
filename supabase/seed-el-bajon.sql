-- El Bajon の品書きに入れ替える SQL
-- Supabase ダッシュボード → SQL Editor に貼り付けて実行してください。
-- ⚠ 既存の menu_items（カレー店時代のメニュー）はすべて削除されます。元に戻せません。
--    Storage の画像は削除されません。
-- 価格は Instagram で公表されているもの（タコス2種）だけ入れています。
-- 他の価格は管理画面（/admin/menu）から入力してください。

begin;

delete from menu_items;

insert into menu_items (title, title_ja, description, tag, price, sort_order, is_visible) values
  ('Tacos al Pastor', 'タコス アル・パストール',
   'スパイスでマリネした豚肉とパイナップルを重ね、本場にならって炭火でロースト。削ぎ切りにしてトルティーヤにのせた、メキシコを代表するタコスです。数量限定。',
   'Tacos', 680, 10, true),
  ('Jamexican', 'ジャメキシカン',
   '自慢のジャークチキンで作る、ジャマイカで流行中のタコス。スパイシー好きの方はぜひ。数量限定。',
   'Tacos', 680, 20, true),
  ('Jerk Chicken', 'ジャークチキン',
   '店の看板メニュー。数種のスパイスに漬け込んだ鶏肉を香ばしく焼き上げた、ジャマイカの味。',
   'World', null, 30, true),
  ('Crêpe Salée', 'クレープ・サレ',
   '南仏の家庭の味を再現。ハム・チーズ・卵を、生地からこだわったクレープで包みました。軽いのに満足感のある一品。',
   'World', null, 40, true),
  ('Ajillo', 'アヒージョ',
   'オリーブオイルとにんにくで仕上げる、スペインの小皿料理。',
   'World', null, 50, true),
  ('Crispy Cheese Cracker', 'カリカリチーズせんべい',
   'オランダ産チーズを焼き、明太子の風味を重ねたおつまみ。お酒と一緒に頼まれることの多い一品です。',
   'Hakata', null, 60, true),
  ('Mentai Butter Toast', 'めんたいバタートースト',
   '明太子とバターのトースト。〆や軽い一品に。',
   'Hakata', null, 70, true),
  ('Oden', 'おでん',
   '屋台らしさと遊び心を詰めた、El Bajon のおでん。',
   'Hakata', null, 80, true),
  ('Tonkotsu Ramen', '豚骨ラーメン',
   '世界を回って、最後は地元へ。博多の屋台らしい一杯。',
   'Hakata', null, 90, true),
  ('Dessert Crêpe', 'デザートクレープ',
   '食後の甘いものに。',
   'Sweets', null, 100, true);

commit;
