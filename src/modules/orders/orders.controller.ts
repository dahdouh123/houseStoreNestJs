import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { OrdersService } from './entities/order.service';
import { Order } from './order.entity';
import { OrderStatus } from './entities/order-status.enum';


@Controller('api/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // Create a new order
    @Post()
    async createOrder(@Body() orderData: Order): Promise<Order> {
        console.log("order receivede from backend",orderData);
        return this.ordersService.createOrder(orderData);
    }
    @Get('list')
    // Get all orders with optional filtering
    async getProd(
       @Query('page') page: number = 1,
       @Query('pageSize') pageSize: number = 10,
       @Query('status') status: OrderStatus,
     ): Promise<{ data: Order[]; rowCount: number }> {
             return this.ordersService.getOrders(page, pageSize, status);
     }

    // Get a specific order by ID
    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<Order> {
        return this.ordersService.getOrderById(id);
    }

    // Update an existing order
    @Put(':id')
    async updateOrder(@Param('id') id: string, @Body() updateData:Partial <Order>): Promise<Order> {
        return this.ordersService.updateOrder(id, updateData);
    }

    
    @Put('updateStatus/:id')
    async updateOrderStatus(@Param('id') id: string, @Body() updateData: Order): Promise<Order> {
        return this.ordersService.updateOrderStatus(id, updateData);
    }

    // Delete an order
    @Delete(':id')
    async deleteOrder(@Param('id') id: string): Promise<void> {
        return this.ordersService.deleteOrder(id);
    }
}