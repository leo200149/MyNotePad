---
layout: post
title: '設計模式-Factory Method工廠方法模式'
date: 2015-03-12 16:19
comments: true
categories: [java, DesignPattern, FactoryMethod]
---
# 設計模式-Factory Method工廠方法模式

如果想學Design Pattern 我推薦 **深入淺出-設計模式**，這真是一本非常好的學習用書。

此篇的主題是，設計模式中最常用的Factory工廠模式-Factory Method 工廠方法模式。

進入主題：

## Factory Method 工廠方法模式

    1. 當想建立一個框架，但是關鍵取得物件的實體，留給後來者決定時。
    2. 現在的工作上，一個專案，時程固定的情況下，有很多個模組需要開發並進行串接，在各個模組同步開發的情況下，互相串接取值的部分就顯得十分麻煩，總不可能等到另一個模組完全開發完成後才開始做吧?這時就很適合使用工廠方法模式，可以先行撰寫自己的業務流程，將串接別的模組取值的部分以抽象方法留下來，延遲到子類別才實作，也就是說，待另一個模組做完時，就只剩建立一個子類別去實作留下來取值的工作而已。

### 定義工廠方法

    1.定義了統一的物件介面
    2.並在工廠超類別定義了用以取得物件的抽象方法，由工廠次類別實作決定創建何種物件實體。
    3.決定了工廠就等於決定了會取得的物件。

所以會有四種角色

    1.物件介面
    2.物件實作
    3.工廠超類別-內含用以產生物件的抽象方法
    4.工廠子類別-實作產生物件的方法

![img](https://lh4.googleusercontent.com/-gvxiaqymC3U/VQHb_Z0OklI/AAAAAAAADY4/RPWxh_K3aXc/w575-h362-no/Untitled.png)

直接來看範例吧

### 舉例說明

這是一個單純符合工廠方法模式的範例
    1.定義一個比薩工廠的框架。
    2.各個地區的工廠都需要以此框架來建立並生產比薩。
    3.每個地區的產品都有各自的特色。

例子的src我有放在github上提供下載(可能與下列的有一點點不同，不過意思是一樣的)
[https://github.com/leo200149/DesignPatternStudy/tree/master/FactoryMethodDemo1](https://github.com/leo200149/DesignPatternStudy/tree/master/FactoryMethodDemo1)

    1.場景:Leo & Billy 想要訂比薩
    2.Leo 想吃紐約風味的 海鮮比薩
    3.Billy 想吃台北風味的 牛肉比薩

來定義pizza介面吧。

```java
public interface Pizza {
    public String getName();
    public String getDescription();
    public void prepaid();
    public void baking();
}
```

來實作紐約風味的海鮮比薩 跟 台北風味的牛肉比薩吧，它們的亨調方式有些不同

```java
public class NYSeafoodPizza implements Pizza {

    @Override
    public String getName() {

        return "SeafoodPizza";
    }

    @Override
    public String getDescription() {

        return "NewYork special flavor "+getName();
    }

    @Override
    public void prepaid() {

        System.out.println(getName()+" prepaiding...");
        System.out.println(getName()+" add NewYork's secret recipe...");
    }

    @Override
    public void baking() {
        System.out.println(getName()+" baking...");

    }

}
public class TPBeefPizza implements Pizza {

    @Override
    public String getName() {

        return "BeefPizza";
    }

    @Override
    public String getDescription() {

        return "Taipei special flavor "+getName();
    }

    @Override
    public void prepaid() {

        System.out.println(getName()+" prepaiding...");
    }

    @Override
    public void baking() {
        System.out.println(getName()+" baking...");
        System.out.println(getName()+" Taipei's secret baking time...");
    }

}
```

在來定義pizza工廠的超類別吧，世界各地的連鎖店工廠都要符合超類別的規範啊。

```java
public abstract class PizzaFactory {

    public enum PIZZATYPE{
        BEEF,SEAFOOD;
    }

    public Pizza orderPizza(PIZZATYPE pizzaType){
        System.out.println(getClass()+" start to prepaidPizza");
        Pizza pizza = createPizza(pizzaType);
        pizza.prepaid();
        pizza.baking();
        return pizza;
    }

    protected abstract Pizza createPizza(PIZZATYPE pizzaType);
}
```

來做出紐約比薩工廠跟台北比薩工廠吧

```java
public class NewYorkPizzaFactory extends PizzaFactory {

    @Override
    protected Pizza createPizza(PIZZATYPE pizzaType) {
        Pizza pizza = null;
        if(pizzaType == PIZZATYPE.BEEF){
            pizza = new NYBeefPizza();
        }else if(pizzaType == PIZZATYPE.SEAFOOD){
            pizza = new NYSeafoodPizza();
        }
        return pizza;
    }

}
public class TaipeiPizzaFactory extends PizzaFactory {

    @Override
    protected Pizza createPizza(PIZZATYPE pizzaType) {
        Pizza pizza = null;
        if(pizzaType == PIZZATYPE.BEEF){
            pizza = new TPBeefPizza();
        }else if(pizzaType == PIZZATYPE.SEAFOOD){
            pizza = new TPSeafoodPizza();
        }
        return pizza;
    }

}
```

現在比薩跟工廠都有了 咱們來訂比薩吧！

```java
public class Main {

    public static void main(String[] args) {
        String people1 = "Leo";
        String people2 = "Billy";
        System.out.println(people1+ " want to buy New York-style pizza ");
        System.out.println(people2+ " want to buy Taipei-style pizza ");
        PizzaFactory callFactory = null;

        callFactory = new NewYorkPizzaFactory();
        Pizza nySeafoodPizza= callFactory.orderPizza(PIZZATYPE.SEAFOOD);
        System.out.println(people1 + " get:"+nySeafoodPizza.getDescription());

        callFactory = new TaipeiPizzaFactory();
        Pizza tpBeefPizza= callFactory.orderPizza(PIZZATYPE.BEEF);
        System.out.println(people2 + " get:"+tpBeefPizza.getDescription());
    }

}
```

結果

```txt
Leo want to buy New York-style pizza 
Billy want to buy Taipei-style pizza 
class factory.NewYorkPizzaFactory start to prepaidPizza
SeafoodPizza prepaiding...
SeafoodPizza add NewYork's secret recipe...
SeafoodPizza baking...
Leo get:NewYork special flavor SeafoodPizza
class factory.TaipeiPizzaFactory start to prepaidPizza
BeefPizza prepaiding...
BeefPizza baking...
BeefPizza Taipei's secret baking time...
Billy get:Taipei special flavor BeefPizza
```

由結果我們可以看出
如果是紐約的比薩工廠 拿到的比薩就是 紐約風味的比薩
如果是台北的比薩工廠 拿到的比薩就是 台北風味的比薩

假如Leo突然想要吃墨西哥風味的比薩，那就去墨西哥的比薩工廠訂，拿到的就是墨西哥風味的比薩了。

決定了工廠，就等於決定了拿到的物件了。
若是有要新增新的物件類別，也只要在新增一個工廠子類別，就可以達到目的，而不需要去修改原先的工廠。

### 舉例說明二

我們工作上常碰到的同步進行開發的狀況類似如下：
1.要開發一個客資查詢的功能，但取客資的API尚未開發完成。

於是我們先完成了CustomerService的主體框架跟流程以及測試用的子類別。

```java
public class CustData{
    public String name;
    public int age;
}

public abstract class CustomerService{

    public String queryCustomerName(String id){
        CustData  custData = queryCustomerData(id); 
        return custData.name;
    }

    private abstract CustData queryCustomerData(String id);
}
public class CustomerTestService extends CustomerService{

    @override
    private CustData queryCustomerData(String id){
        CustData custData = new CustData();
        custData.name="JustTest"+id;
        reutrn custData;
    }

}
```

我們來測試流程是否正確吧。

```java
public class Main{
    public static void main(String[] args){
        CustomerService service = new CustomerTestService();
        String name = service.queryCustomerName("I0001");
        System.out.println("custName="+name);
    }
}
```

結果

```txt
custName=JustTestI0001
```

等到API完成並可以測試時，我們就可以建一個子類別去實作查詢API的功能。
如果客資有兩隻API可以使用的話，那我們甚至可以輕鬆的再建另一個子類別，然後依需求使用兩隻API而不互相干擾跟依賴。

```java
public class CustomerBusService extends CustomerService{

    @override
    private CustData queryCustomerData(String id){
        CustData custData = new CustData();
        //DO Query from BUS API by Id... and setCustData
        custData.name="BUS.Leo";
        reutrn custData;
    }

}
public class CustomerCoesService extends CustomerService{

    @override
    private CustData queryCustomerData(String id){
        CustData custData = new CustData();
        //DO Query from COES API by Id... and setCustData
        custData.name="COES.Leo";
        reutrn custData;
    }

}
```

既然API都串好了，那咱們來測試吧！

```java
public class Main{
    public static void main(String[] args){
        CustomerService service = new CustomerTestService();
        System.out.println("custName="+service.queryCustomerName("I0001"));
        service = new CustomerBusService();
        System.out.println("custName="+service.queryCustomerName("I0001"));
        service = new CustomerCoesService();
        System.out.println("custName="+service.queryCustomerName("I0001"));
    }
}
```

結果

```txt
custName=JustTestI0001
custName=BUS.Leo
custName=COES.Leo
```

這樣做是不是就不用等API開發完成也可以先行完成我們大部份的工作並測試通過呢？呵呵
而且在更改API的部分時，也不會在去更動到測試完成的部分。
