# 資料庫基礎

1. 一個資料庫伺服器(管理器) -> 多個資料庫
2. 一個資料庫 -> 多張表
3. 一張表 -> 多筆資料
4. 一筆資料 -> 多個欄位
5. 一個欄位為最小單位

## 資料正規化

1. 將資料拆分整理成表格

### 原始資料

#### 訂單

訂單號碼|訂單日期|客戶編號|公司名稱|連絡人|連絡職稱|地址|電話|產品編號|產品|單價|數量
-------|-------|-------|-------|-----|-------|----|----|------|----|---|------------------
1|2/9/1998|CENTC|三捷實業|林小姐|研發人員|屏東縣當文鄉永大路4號|(07)223-6665|2|牛奶|NT$19|1
2|3/26/1998|FOLKO|雅洲信託|陳先生|董事長|桃園市北平東路64號|(03)277-9682|2|牛奶|NT$19|35
2|3/26/1998|FOLKO|雅洲信託|陳先生|董事長|桃園市北平東路64號|(03)277-9682|4|鹽巴|NT$23|10
2|3/26/1998|FOLKO|雅洲信託|陳先生|董事長|桃園市北平東路64號|(03)277-9682|5|海鮮粉|NT$10|30
3|4/20/1998|LINOD|保信人壽|黃雅玲|董事長|台北市忠孝東路四段32號|(02)968-9652|1|蘋果汁|NT$17|28
3|4/20/1998|LINOD|保信人壽|黃雅玲|董事長|台北市忠孝東路四段32號|(02)968-9652|2|牛奶|NT$19|60
3|4/20/1998|LINOD|保信人壽|黃雅玲|董事長|台北市忠孝東路四段32號|(02)968-9652|3|蕃茄醬|NT$14|24

### 正規化後 

#### Customer

客戶編號|公司名稱|連絡人|連絡職稱|地址|電話
------|-------|-----|-------|---|---------
CENTC|三捷實業|林小姐|研發人員|屏東縣當文鄉永大路4號|(07) 223-6665
FOLKO|雅洲信託|陳先生|董事長|桃園市北平東路64號|(03) 277-9682
LINOD|保信人壽|黃雅玲|董事長|台北市忠孝東路四段32號|(02) 968-9652

#### Product

產品編號|產品|貨幣|單價
------|----|---|-------
1|蘋果汁|NT|17
2|牛奶|NT|19
3|蕃茄醬|NT|14
4|鹽巴|NT|23
5|海鮮粉|NT|10

#### Order

訂單號碼|訂單日期|客戶編號
------|-------|-------
1|2/9/1998|CENTC
2|3/26/1998|FOLKO
3|4/20/1998|LINOD

#### OrderDetail

訂單號碼|產品編號|數量
------|-------|-------
1|2|1
2|2|35
2|4|10
2|5|30
3|1|28
3|2|60
3|3|24

## SQL基礎

### 參考資料

1. [DOCKER 簡介](https://philipzheng.gitbooks.io/docker_practice/content/introduction/what.html)
2. [DOCKER INSTALL](https://docs.docker.com/docker-for-mac/install/)
3. [DOCKER HUB](https://hub.docker.com/)
4. [POSTGRES IMAGE](https://hub.docker.com/_/postgres/)

### 練習環境

1. 練習`postgresql`資料庫
2. 用`docker`架設 `postgresql server`
3. 用`inteilj ide`內建資料庫`client gui`做練習

參考指令

```bash
## 先移除舊的實體
docker rm -f postgres-test
## 建立新的
docker run -d --name postgres-test \
-p 5432:5432 \
-e POSTGRES_PASSWORD=mypassword postgres
```

起來後的地址及登入資訊
```
jdbc:postgresql://localhost:5432/postgres
user:postgres
pwd:mypassword
```

### SQL語法

1. `CRUD`新增/查詢/修改/刪除
2. 修改刪除等動作需謹慎，先查後改。

### CREATE:建立新增

建立資料庫

```SQL
CREATE DATABALSE testdb;
CREATE DATABALSE company;
```

切換至`company`資料庫並建立表格

```SQL
CREATE TABLE customer
(
    id bigserial PRIMARY KEY,
    code varchar(50) NOT NULL,
    company_name varchar(300) NOT NULL,
    contact_user varchar(100),
    contact_user_title varchar(100),
    address varchar(500),
    phone varchar(50)
);
CREATE UNIQUE INDEX customer_code_uindex ON customer (code);

CREATE TABLE product
(
    id bigserial PRIMARY KEY NOT NULL,
    product_name varchar(100) NOT NULL,
    currency varchar(10) NOT NULL,
    cost bigint DEFAULT 0 NOT NULL
);

CREATE TABLE orders
(
    id bigserial PRIMARY KEY,
    customer_code varchar(20) NOT NULL,
    create_time timestamp NOT NULL
);

CREATE TABLE order_detail
(
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    counts int
);

CREATE TABLE test
(
    id bigserial PRIMARY KEY
);

```

新增資料

```SQL
INSERT INTO customer(code,company_name,contact_user,contact_user_title,address,phone) VALUES ('CENTC','三捷實業','林小姐','研發人員','屏東縣當文鄉永大路4號','(07) 223-6665');
INSERT INTO customer(code,company_name,contact_user,contact_user_title,address,phone) VALUES ('FOLKO','雅洲信託','陳先生','董事長','桃園市北平東路64號','(03) 277-9682');
INSERT INTO customer(code,company_name,contact_user,contact_user_title,address,phone) VALUES ('LINOD','保信人壽','黃雅玲','董事長','台北市忠孝東路四段32號','(02) 968-9652');


INSERT INTO product(id,product_name,currency,cost) VALUES (1,'蘋果汁','NT',17);
INSERT INTO product(id,product_name,currency,cost) VALUES (2,'牛奶','NT',19);
INSERT INTO product(id,product_name,currency,cost) VALUES (3,'蕃茄醬','NT',14);
INSERT INTO product(id,product_name,currency,cost) VALUES (4,'鹽巴','NT',23);
INSERT INTO product(id,product_name,currency,cost) VALUES (5,'海鮮粉','NT',10);

INSERT INTO orders(id,create_time,customer_code) VALUES (1,to_timestamp('2/9/1998','mm/dd/yyyy'),'CENTC');
INSERT INTO orders(id,create_time,customer_code) VALUES (2,to_timestamp('3/26/1998','mm/dd/yyyy'),'FOLKO');
INSERT INTO orders(id,create_time,customer_code) VALUES (3,to_timestamp('4/20/1998','mm/dd/yyyy'),'LINOD');

INSERT INTO order_detail(order_id,product_id,counts) VALUES (1,2,1);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (2,2,35);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (2,4,10);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (2,5,30);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (3,1,28);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (3,2,60);
INSERT INTO order_detail(order_id,product_id,counts) VALUES (3,3,24);
```

### READ:查詢

查客戶

```SQL
SELECT * FROM customer;
```

加上過濾條件

```SQL
SELECT * FROM customer
WHERE code = 'CENTC';
```

多重過濾條件

```SQL
SELECT * FROM customer
WHERE code = 'CENTC'
OR contact_user like '%林%'
AND id IN (1,2,3);
```

單獨查詢欄位

```SQL
SELECT code,name,address FROM customer;
```

查詢排序

```SQL
SELECT * FROM customer
ORDER BY ID DESC;
```

### UPDATE:修改

更新商品金額

```SQL
UPDATE product SET cost = 30
WHERE id = 1;
```

更新所有商品幣別

```SQL
UPDATE product SET currency = 'USD';
```

### DELETE:刪除

刪除訂單及明細

```SQL
DELETE FROM order_detail
WHERE order_id = 2 
AND product_id = 2;
```

刪除無用表格
```SQL
DROP TABLE test;
```

刪除無用資料庫
```SQL
DROP DATABASE testdb;
```

## 進階SQL

### 多表聯合查詢

查回原始資料格式

```SQL
SELECT 
    o.id AS 訂單號碼,
    o.create_time AS 訂單日期,
    o.customer_code AS 客戶編號,
    c.company_name AS 公司名稱,
    c.contact_user AS 連絡人,
    c.contact_user_title AS 連絡職稱,
    c.address AS 地址,
    c.phone AS 電話,
    p.id AS 產品編號,
    p.product_name AS 產品,
    p.cost AS 單價,
    od.counts AS 數量
FROM orders o
JOIN customer c ON c.code = o.customer_code
JOIN order_detail od ON od.order_id = o.id
JOIN product p ON p.id = od.product_id;
```

計算訂單總金額

```SQL
SELECT
   od.order_id AS 訂單號碼,
   sum(od.counts * p.cost) AS 總金額
FROM order_detail od
JOIN product p ON p.id = od.product_id
GROUP BY od.order_id
ORDER BY od.order_id;
```
