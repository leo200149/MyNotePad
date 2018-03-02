---
layout: post
title: '設計模式-Abstract Factory抽象工廠模式'
date: 2015-03-20 10:35
comments: true
categories: [factory, DesignPattern, java, abstract]
---
# 設計模式-Abstract Factory抽象工廠模式

如果想學Design Pattern 我推薦 **深入淺出-設計模式**，這真是一本非常好的學習用書。

此篇的主題是，設計模式中最常用的Factory工廠模式-Abstract Factory 抽象工廠模式。

進入主題：

## Abstract Factory 抽象工廠模式

前面的[工廠方法](http://hycleo.logdown.com/posts/257303--factory-method-design-pattern-factory-method-pattern)是針對一種物件在做處理，那假如我想要拿到的是一組多個物件呢？

你可能會說「那就多寫幾組工廠方法囉！」，你說的沒錯，就是多定義幾組抽象的工廠方法，多個物件的工廠方法集合在一個工廠當中，這就是抽象工廠，利用多個工廠方法寫一個介面，實作此介面來完成相對應的一套物件，適合用於需要可以方便整組物件一起抽換的情境。

### 定義抽象工廠

    1.提供一個介面，用於創建相關的物件家族
    2.實作不同的抽象工廠，將提供不同的物件家族，內容以工廠方法做實作。
    3.決定了工廠就等於決定了會取得的物件家族。

所以會有四種角色

    1.物件介面
    2.物件實作
    3.工廠介面-內含多個用以產生物件的抽象方法
    4.工廠實作-實作各個產生物件的方法

直接來看範例吧

### 舉例說明

例子的範例我有放在github上提供下載(可能與下列的有一點點不同，不過意思是一樣的)
[https://github.com/leo200149/DesignPatternStudy/tree/master/FactoryAbstractDemo1](https://github.com/leo200149/DesignPatternStudy/tree/master/FactoryAbstractDemo1)

    1.場景:Leo想從兩家賣電腦的大公司 HP跟Lemel 買電腦
    2.電腦基本配件：CPU,DisplayCard,Power,RAM
    3.HP的電腦配備廠商:CPU:Intel,DISPLAY_CARD:MSI,POWER:Corsair,RAM:Kinston
    4.Lemel的電腦配備廠商:CPU:AMD,DISPLAY_CARD:ASUS,POWER:Antec,RAM:ADATA

來定義CPU,DisplayCard,Power,RAM介面吧

```java
public interface CPU {
    public String getManufacturers();
    public String getDescription();
    public int price();
    public int getCores();
    public int getBit();
}
public interface DisplayCard {
    public String getManufacturers();
    public String getDescription();
    public int price();
    public int getGPUClock();
    public String getRAM();
    public String getIC();
}
//Power,RAM......略 可以直接去下載範例
```

在來實作各廠商的零件產品吧

```java
public class AMDCPU implements CPU {

    @Override
    public String getManufacturers() {

        return "AMD";
    }

    @Override
    public String getDescription() {

        return getManufacturers()+"/"+"AM3+ FX-8320";
    }

    @Override
    public int price() {

        return 4550;
    }

    @Override
    public int getCores() {
        return 8;
    }

    @Override
    public int getBit() {

        return 64;
    }

}
public class IntelCPU implements CPU {

    @Override
    public String getManufacturers() {

        return "Intel";
    }

    @Override
    public String getDescription() {

        return getManufacturers()+"/Core I5-4440";
    }

    @Override
    public int price() {
        return 5600;
    }

    @Override
    public int getCores() {

        return 4;
    }

    @Override
    public int getBit() {

        return 64;
    }

}
//DisplayCard,Power,RAM......略 可以直接去下載範例
```

來定義抽象電腦工廠介面吧

```java
public interface AbstractComputerFactory {

    public CPU getCPU();

    public DisplayCard getDisplayCard();

    public Power getPower();

    public RAM getRAM();

    public int getTotalPrice();
}
```

實作HP工廠跟Lemel工廠

```java
public class HPComputerFactory implements AbstractComputerFactory {

    @Override
    public CPU getCPU() {

        return new IntelCPU();
    }

    @Override
    public DisplayCard getDisplayCard() {

        return new MSIDisplayCard();
    }

    @Override
    public Power getPower() {

        return new CorsairPower();
    }

    @Override
    public RAM getRAM() {

        return new KinstonRAM();
    }

    @Override
    public int getTotalPrice() {

        return getCPU().price()+getDisplayCard().price()+getPower().price()+getRAM().price();
    }

}

public class LemelComputerFactory implements AbstractComputerFactory {

    @Override
    public CPU getCPU() {
        return new AMDCPU();
    }

    @Override
    public DisplayCard getDisplayCard() {

        return new AsusDisplayCard();
    }

    @Override
    public Power getPower() {

        return new AntecPower();
    }

    @Override
    public RAM getRAM() {

        return new ADATARAM();
    }

    @Override
    public int getTotalPrice() {

        return getCPU().price()+getDisplayCard().price()+getPower().price()+getRAM().price();
    }

}
```

工廠跟零件都準備好了，我們來買電腦吧!

```java
public class Main {

    public static void main(String[] args){
        System.out.println("Leo want to buy computer from HP & Lemel");
        buyComputer(new HPComputerFactory());
        buyComputer(new LemelComputerFactory());
    }

    public static void buyComputer(AbstractComputerFactory computerFactory){
        System.out.println("======="+computerFactory.getClass()+" Computer Specifications=======");
        System.out.println("CPU:"+computerFactory.getCPU().getDescription());
        System.out.println("DISPLAY_CARD:"+computerFactory.getDisplayCard().getDescription());
        System.out.println("POWER:"+computerFactory.getPower().getDescription());
        System.out.println("RAM:"+computerFactory.getRAM().getDescription());
        System.out.println("TotalPrice:"+computerFactory.getTotalPrice());
    }
}
```

結果

```txt
Leo want to buy computer from HP & Lemel
=======class factory.HPComputerFactory Computer Specifications=======
CPU:Intel/Core I5-4440
DISPLAY_CARD:MSI/R9 270/2GB DDR5
POWER:Corsair/CX500V2/550W
RAM:Kinston/DDR3 1600 8GB
TotalPrice:8020
=======class factory.LemelComputerFactory Computer Specifications=======
CPU:AMD/AM3+ FX-8320
DISPLAY_CARD:ASUS/GTX 750 TI/GDDR5 2GB
POWER:Antec/NEO-ECO-400C-BR/400W
RAM:ADATA/DDR3 1600 4GB
TotalPrice:6430
```

我們定義了電腦廠商的介面，每個廠商都來實作此介面，並組合相對應的零件，
最後產出各自的電腦，決定了電腦的廠商，也就決定了相對應取得的電腦零件組合。