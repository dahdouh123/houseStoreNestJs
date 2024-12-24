import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { OrderProducts } from './order-products.entity';
import { UserInfos } from './user-infos.entity';
import { Order } from '../order.entity';
import { OrderStatus } from './order-status.enum';
import { Product } from 'modules/User/pos/entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(

        @InjectRepository(Order,'store')
        private ordersRepository: Repository<Order>,
        @InjectRepository (Product ,'store')
        private productsRepository: Repository<Product>,
       
    ) {}

    async createOrder(orderData: Order): Promise<Order> {
        const order = this.ordersRepository.create(orderData);
        return this.ordersRepository.save(order);
    }

   async getOrders(
     page: number,
     pageSize: number,
     status: OrderStatus
   ): Promise<{ data: Order[]; rowCount: number; currentPage: number; pageSize: number , status:OrderStatus }> {
    console.log("status", status);
     
    if(status == OrderStatus.All)
    {
      let queryOptions = {
        skip: (page - 1) * pageSize,
        take: pageSize,
        relations: ['includedProducts', 'userInfos'],
      };
      const [Placeions, rowCount] = await this.ordersRepository.findAndCount(queryOptions);
      return {
        data: Placeions,  // Array of data with images in Base64
        rowCount,             // Total number of items
        currentPage: page,    // Current page number
        pageSize, 
        status            // Page size
      };
    }
    else
    {
      let queryOptions = {
        skip: (page - 1) * pageSize,
        take: pageSize,
        relations: ['includedProducts', 'userInfos'],
        where: { orderStatus:status } // Add condition to filter by status
        // Include relations here
      };
      const [Placeions, rowCount] = await this.ordersRepository.findAndCount(queryOptions);
      return {
        data: Placeions,  // Array of data with images in Base64
        rowCount,             // Total number of items
        currentPage: page,    // Current page number
        pageSize, 
        status            // Page size
      };
    }
   
   
     // Convert image Buffers to Base64 for all Places
     
   
    
   }
    async getOrderById(id: string): Promise<Order> {
        return this.ordersRepository.findOne({
            where: { id : id }
        });
    }

    async updateOrder(id: string, updateData: Partial<Order>): Promise<Order> {
      console.log('Updating order',updateData);
        await this.ordersRepository.update(id, updateData);
        return this.getOrderById(id);
    }

    async updateOrderStatus(id: string, updateData: Partial<Order>): Promise<Order> {
      // Find the order by ID
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: ['includedProducts'], // Ensure products are included
      });
    
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
    
      // Update order status
      if (updateData.orderStatus) {
        order.orderStatus = updateData.orderStatus;
      }
    
      try {
        // Handle stock adjustment for specific statuses
        if (
          updateData.orderStatus === OrderStatus.Confirmed 
         
        ) {
          for (const element of order.includedProducts) {
            const product = await this.productsRepository.findOne({
              where: { id: element.productId },
            });
    
            if (!product) {
              throw new NotFoundException(
                `Product with ID ${element.productId} not found`
              );
            }
    
            if (product.quantity < element.qte) {
              throw new Error(
                `Insufficient stock for product ${product.name}. Available: ${product.quantity}, Required: ${element.qte}`
              );
            }
    
            product.quantity -= element.qte;
            await this.productsRepository.save(product);
          }
        }
    
        if (
          updateData.orderStatus === OrderStatus.Cancelled ||
          updateData.orderStatus === OrderStatus.Refunded
        ) {
          for (const element of order.includedProducts) {
            const product = await this.productsRepository.findOne({
              where: { id: element.productId },
            });
    
            if (!product) {
              throw new NotFoundException(
                `Product with ID ${element.productId} not found`
              );
            }
    
            product.quantity += element.qte;
            await this.productsRepository.save(product);
          }
        }
    
        // Save updated order
        return await this.ordersRepository.save(order);
      } catch (error) {
        throw new Error(`Failed to update order status: ${error.message}`);
      }
    }
    
    
    async deleteOrder(id: string): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}