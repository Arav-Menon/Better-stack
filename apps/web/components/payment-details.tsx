"use client";

import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export function PaymentDetails() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleAddCard = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      last4: newCard.number.slice(-4),
      brand: "Visa", // Would be determined by card number
      expiryMonth: Number.parseInt(newCard.expiry.split("/")[0]),
      expiryYear: Number.parseInt("20" + newCard.expiry.split("/")[1]),
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
    setIsAddingCard(false);
  };

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <Card className="bg-[#0c0c0c] border-border">
      <CardHeader>
        <CardTitle className="text-[#fff] flex items-center justify-between">
          Payment Methods
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddingCard(true)}
            className="border-border"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Payment Methods */}
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-[#fff]">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {method.expiryMonth}/{method.expiryYear}
                  {method.isDefault && " • Default"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSetDefault(method.id)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCard(method.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add New Card Form */}
        {isAddingCard && (
          <div className="p-4 border border-border rounded-lg space-y-4">
            <h4 className="text-sm font-medium text-card-foreground">
              Add New Card
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  value={newCard.name}
                  onChange={(e) =>
                    setNewCard({ ...newCard, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="bg-input border-border"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  value={newCard.number}
                  onChange={(e) =>
                    setNewCard({ ...newCard, number: e.target.value })
                  }
                  placeholder="1234 5678 9012 3456"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="card-expiry">Expiry Date</Label>
                <Input
                  id="card-expiry"
                  value={newCard.expiry}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expiry: e.target.value })
                  }
                  placeholder="MM/YY"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="card-cvc">CVC</Label>
                <Input
                  id="card-cvc"
                  value={newCard.cvc}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvc: e.target.value })
                  }
                  placeholder="123"
                  className="bg-input border-border"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleAddCard}
                className="bg-primary text-primary-foreground"
              >
                Add Card
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsAddingCard(false)}
                className="border-border"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {paymentMethods.length === 0 && !isAddingCard && (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No payment methods added yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
