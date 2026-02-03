import Image from "next/image";
import { ShoppingCart, CheckCircle, Zap } from "lucide-react";

type OrderItem = {
  id: string;
  title: string;
  seller: string;
  price: number;
  image: string;
  customized?: boolean;
};

type OrderCardProps = {
  orderId: string;
  completedAt: string;
  items: OrderItem[];
  subtotal: number;
};

export default function OrderCard({
  orderId,
  completedAt,
  items,
  subtotal,
}: OrderCardProps) {
  return (
    <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-gray-700">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold text-lg">#{orderId}</span>
        </div>

        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>Order Completed:</span>
          <span>{completedAt}</span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-gray-900">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>Seller:</span>
                  <span className="font-medium text-light">
                    {item.seller}
                  </span>

                  {item.customized && (
                    <>
                      <span className="mx-1 bg-light w-2 h-2 rounded-full"></span>
                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <Zap className="w-3 h-3" />
                        Customized
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="font-md text-grey-400 text-lg">
              ₦{item.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6">
        <div className="text-gray-500 text-lg">
          Subtotal:
          <span className="ml-2 font-md text-grey-400 text-lg">
            ₦{subtotal.toLocaleString()}
          </span>
        </div>

        <button className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition">
          Details
        </button>
      </div>
    </div>
  );
}
