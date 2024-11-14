use extension::postgres::Type;
use sea_orm::{ EnumIter, Iterable };
use sea_orm_migration::{ prelude::*, schema::* };

use crate::{
    m20220101_000001_create_user::User,
    m20241021_041026_product::Product,
    utils::{ pg_id, pg_primary_id, timestampz_default },
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        //create order_status type
        manager.create_type(
            Type::create().as_enum(OrderStatusEnum).values(OrderStatus::iter()).to_owned()
        ).await?;

        // create payment_method type
        manager.create_type(
            Type::create().as_enum(PaymentMethodEnum).values(PaymentMethod::iter()).to_owned()
        ).await?;

        // create order table
        manager.create_table(
            Table::create()
                .table(Order::Table)
                .if_not_exists()
                .col(pg_primary_id(Order::Id))
                .col(pg_id(Order::ProductId))
                .col(pg_id(Order::UserId))
                .col(small_integer(Order::Quantity))
                .col(enumeration(Order::Status, OrderStatusEnum, OrderStatus::iter()))
                .col(enumeration(Order::PaymentMethod, PaymentMethodEnum, PaymentMethod::iter()))
                .col(timestampz_default(Order::CreatedAt))
                .col(timestampz_default(Order::UpdatedAt))
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-order_product")
                        .from(Order::Table, Order::ProductId)
                        .to(Product::Table, Product::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-order_user")
                        .from(Order::Table, Order::UserId)
                        .to(User::Table, User::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop order table
        manager.drop_table(Table::drop().table(Order::Table).to_owned()).await?;

        // drop order_status type
        manager.drop_type(Type::drop().name(OrderStatusEnum).to_owned()).await?;

        // drop payment_method type
        manager.drop_type(Type::drop().name(PaymentMethodEnum).to_owned()).await?;

        Ok(())
    }
}

#[derive(Debug, DeriveIden)]
#[sea_orm(iden = "payment_method")]
struct PaymentMethodEnum;

#[derive(Iden, EnumIter)]
pub enum PaymentMethod {
    #[iden = "Nowpayments"]
    Nowpayments,
    #[iden = "Btcpay"]
    Btcpay,
    #[iden = "Paypal"]
    Paypal,
}

#[derive(Debug, DeriveIden)]
#[sea_orm(iden = "order_status")]
struct OrderStatusEnum;

#[derive(Iden, EnumIter)]
pub enum OrderStatus {
    #[iden = "Success"]
    Success,
    #[iden = "Pending"]
    Pending,
}

#[derive(DeriveIden)]
enum Order {
    Table,
    Id,
    Quantity,
    ProductId,
    UserId,
    PaymentMethod,
    CreatedAt,
    UpdatedAt,
    Status,
}
