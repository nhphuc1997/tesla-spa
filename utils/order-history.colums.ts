import { TableProps } from "antd";
import { formatCurrency } from "./format-currency";

interface DataType {
  key: string;
  orderId: string;
  amount: number;
  interior: Record<string, any>;
  exterior: Record<string, any>;
  alloy: Record<string, any>;
  product: Record<string, any>;
  createAt: string;
  type: string;
}

export const ORDER_HISTORY_COLUMNS: TableProps<DataType>['columns'] = [
  {
    key: 'orderId',
    dataIndex: 'orderId',
    title: 'order ID',
    width: 50,
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    title: 'Amount',
    render: (amount: number) => `${formatCurrency(amount)}`
  },
  {
    key: 'interior',
    dataIndex: 'interior',
    title: 'Interior',
    render: (interior: any) => `${interior?.name} (${formatCurrency(interior?.price)})`
  },
  {
    key: 'exterior',
    dataIndex: 'exterior',
    title: 'Exterior',
    render: (exterior: any) => `${exterior?.name} (${formatCurrency(exterior?.price)})`
  },
  {
    key: 'alloy',
    dataIndex: 'alloy',
    title: 'Alloys',
    render: (alloy: any) => `${alloy?.name} (${formatCurrency(alloy?.price)})`
  },
  {
    key: 'product',
    dataIndex: 'product',
    title: 'Product',
    render: (product: any) => `${product?.name} (${formatCurrency(product?.price)})`
  },
  {
    key: 'type',
    dataIndex: 'product',
    title: 'type',
    render: (product: any) => `${product?.kind}`
  },
  {
    key: 'createAt',
    dataIndex: 'createAt',
    title: 'Create At',
  },
]