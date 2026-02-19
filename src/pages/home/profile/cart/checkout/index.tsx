import { useState, useEffect, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import {
    CheckCircle2,
    MapPin,
    Calendar,
    Package,
    CreditCard,
    ChevronDown,
    Pencil,
    Clock,
    Star,
    AlertCircle,
} from "lucide-react";
import { formatKoboToNaira } from "@/utilities/format.helper";
import { useCentral } from "@/context/CentralContext";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { usePostWithData } from "@/utilities/useQuery";
import { toast } from 'sonner';
import api from "@/config/axiosInstance";

const schema = z
    .object({
        recipientName: z.string().min(2, "Name must be at least 2 characters"),
        recipientEmail: z.string().email("Enter a valid email address"),
        recipientPhone: z
            .string()
            .min(7, "Enter a valid phone number")
            .regex(/^\d+$/, "Only digits allowed"),
        deliveryAddress: z.string().min(5, "Enter a valid address"),
        postalCode: z.string().min(3, "Enter a valid postal code"),
        deliveryDate: z.string().min(1, "Select a delivery date"),
        deliveryTime: z.string().min(1, "Select a delivery time"),
        packageTypeId: z.string().min(1, "Package type must be selected"),
        state: z.string().min(1),
        lga: z.string().min(1),
        couponCode: z.string().optional(),
        paymentMethod: z.enum(["BANK_TRANSFER", "CARD"], {
            required_error: "Select a payment method",
        }),
    })
    .superRefine((data, ctx) => {
        if (!data.deliveryDate || !data.deliveryTime) return;

        // Combine date + time into a single Date object
        const selectedDateTime = new Date(
            `${data.deliveryDate}T${data.deliveryTime}`
        );

        const now = new Date();

        // 24 hours in milliseconds
        const minAllowedTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        if (selectedDateTime < minAllowedTime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Delivery must be at least 24 hours from now",
                path: ["deliveryDate"], // you can also attach to deliveryTime
            });
        }
    });


type FormValues = z.infer<typeof schema>;

type PaymentId = "BANK_TRANSFER" | "CARD";


interface PaymentOption {
    id: PaymentId;
    label: string;
    icon: LucideIcon;
}

const paymentOptions: PaymentOption[] = [
    //   { id: "bank", label: "Pay with Bank Transfer", icon: Landmark },
    { id: "CARD", label: "Pay with Card", icon: CreditCard },
];

interface SectionHeaderProps {
    icon: LucideIcon;
    title: string;
    completed?: boolean;
    onPenClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    icon: Icon,
    title,
    completed = false, onPenClick
}) => (
    <div className="flex items-center gap-3 mb-6">
        <div
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${completed ? "bg-[#4CAF50]" : "bg-secondary"
                }`}
        >
            {completed ? (
                <CheckCircle2 size={16} className="text-white" />
            ) : (
                <Icon size={14} className="text-white" />
            )}
        </div>
        <h2 className="text-secondary font-semibold text-base tracking-wide font-[Playfair_Display]">
            {title}
        </h2>
        {completed && (
            <button
                type="button"
                aria-label="Edit section"
                className="ml-1 text-amber-500 hover:text-amber-600"
                onClick={onPenClick}
            >
                <Pencil size={14} />
            </button>
        )}
    </div>
);

interface FieldErrorProps {
    message?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ message }) =>
    message ? (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={11} />
            {message}
        </p>
    ) : null;

const inputCls =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition placeholder:text-gray-400";

const now = new Date();
const minDateTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

const minDate = minDateTime.toISOString().split("T")[0];
const minTime = minDateTime.toTimeString().slice(0, 5); // HH:mm



export default function CheckoutPage(): React.ReactElement | null {
    const [mounted, setMounted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disableAddressForm, setDisableAddressForm] = useState<boolean>(true);
    const { packages, states, setActiveState, isFetchingStates, isFetchingLGA, lgas, activeState, fetchDeliverFee } = useCentral();
    const { user } = useUser();
    const { cart, totalAmount, totalQuantity, refetchUserCart } = useCart();

    useEffect(() => {
        setMounted(true);
    }, []);


    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            recipientName: "",
            recipientEmail: "",
            recipientPhone: "",
            deliveryAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
            postalCode: "1000101",
            deliveryDate: "",
            deliveryTime: "",
            packageTypeId: "",
            paymentMethod: "CARD",
            state: '',
            lga: '',
        },
        mode: "onChange",
    });

    useEffect(() => {
        reset({
            recipientName: user?.fullName || "",
            recipientEmail: user?.email || "",
            recipientPhone: user?.phone || "",
            deliveryAddress: user?.address || "2972 Westheimer Rd. Santa Ana, Illinois 85486",
            postalCode: user?.postalCode || "",
            deliveryDate: "",
            deliveryTime: "",
            packageTypeId: packages?.[0]?._id || "",
            paymentMethod: "CARD",
            state: user?.state || '',
            lga: user?.localGovernmentArea || '',
        })

        if (user?.state) setActiveState(user?.state)

    }, [user, states, packages])

    const selectedPackage = watch("packageTypeId");
    const selectedDate = watch("deliveryDate");
    const selectedLGA = watch("lga");

    const [deliveryFee, setDeliveryFee] = useState<number>(0);

    useEffect(() => {
        const getDeliveryFee = async () => {
            if (selectedLGA && activeState) {
                try {
                    const res = await fetchDeliverFee(selectedLGA);
                    setDeliveryFee(Number(res));
                } catch (error) {
                    console.error("Failed to fetch delivery fee", error);
                    setDeliveryFee(0);
                }
            } else {
                setDeliveryFee(0);
            }
        };

        getDeliveryFee();
    }, [selectedLGA, activeState]);

    const pkgFee: number =
        packages.find((p) => p._id === selectedPackage)?.price ??
        0;

    const amountToPay: number = totalAmount + deliveryFee + pkgFee;
    const finalAmount: number = amountToPay;

    const { mutateAsync: checkout, isPending } = usePostWithData("app", ["checkout-cart"], `/checkout`, false);


    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        console.log("Checkout data:", data);
        setLoading(true)

        try {
            const res: any = await checkout(data);

            console.log({ res });

            return pay(res?._id);

        } catch (error: any) {
            setLoading(false)
            toast.error(
                `${error}`
            );
        }
    };

    const pay = async (orderId: string) => {
        try {
            const res: any = await api('app').post(`/checkout/${orderId}/pay`, {});

            const url = res?.data?.data?.authorization_url;
            console.log({ res, url });

            window.location.assign(url);
            // refetchUserCart();
            // toast.success('Item deleted from cart successfully');
        } catch (error: any) {
            toast.error(
                `${error}`
            );
        }

        setLoading(false)
    };

    if (!mounted) return null;





    return (
        <div
            className="min-h-screen p-2 md:p-6"
        >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader icon={MapPin} title="Customers Address" completed={true} onPenClick={() => setDisableAddressForm(false)} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Recipient Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("recipientName")}
                                    className={inputCls}
                                    placeholder="Full name"
                                    disabled={disableAddressForm}
                                />
                                {!errors.recipientName && watch("recipientName") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>
                            <FieldError message={errors.recipientName?.message} />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Recipient Email
                            </label>
                            <div className="relative">
                                <input
                                    {...register("recipientEmail")}
                                    className={inputCls}
                                    placeholder="Email address"
                                    disabled={disableAddressForm}

                                />
                                {!errors.recipientEmail && watch("recipientEmail") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>
                            <FieldError message={errors.recipientEmail?.message} />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Recipient Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("recipientPhone")}
                                    className={inputCls}
                                    placeholder="Phone number"
                                    disabled={disableAddressForm}

                                />
                                {!errors.recipientPhone && watch("recipientPhone") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>
                            <FieldError message={errors.recipientPhone?.message} />
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                State
                            </label>
                            <div className="relative">
                                <select
                                    {...register("state")}
                                    disabled={isFetchingStates || disableAddressForm}
                                    onChange={(e) => {
                                        setActiveState(e?.target?.value)
                                        // field.onChange(value);
                                    }}
                                    className={inputCls}

                                >
                                    <option className="" value={''}>{isFetchingStates ? "Loading states..." : "Select State"}</option>
                                    {states?.map((state, index) => <option value={state} key={index}>{state}</option>)}

                                </select>
                                {!errors.state && watch("state") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>

                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Local Government
                            </label>
                            <div className="relative">
                                <select
                                    {...register("lga")}
                                    disabled={isFetchingStates || disableAddressForm}

                                    className={inputCls}

                                >
                                    <option className="" value={''}>{isFetchingLGA ? "Loading lgas..." : "Select LGA"}</option>
                                    {lgas?.map((lga, index) => <option value={lga} key={index}>{lga}</option>)}
                                </select>
                                {!errors.state && watch("lga") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>

                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Postal Code
                            </label>
                            <div className="relative">
                                <input
                                    {...register("postalCode")}
                                    className={inputCls}
                                    placeholder="Postal code"
                                    disabled={disableAddressForm}

                                />
                                {!errors.postalCode && watch("postalCode") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>
                            <FieldError message={errors.postalCode?.message} />
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Delivery Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    {...register("deliveryAddress")}
                                    className={inputCls}
                                    placeholder="Street address"
                                    disabled={disableAddressForm}

                                />
                                {!errors.deliveryAddress && watch("deliveryAddress") && (
                                    <CheckCircle2
                                        size={15}
                                        className="absolute right-3 top-3 text-[#4CAF50]"
                                    />
                                )}
                            </div>
                            <FieldError message={errors.deliveryAddress?.message} />
                        </div>


                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader icon={Calendar} title="Schedule Delivery" completed={false} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    {...register("deliveryDate")}
                                    className={`${inputCls} pr-10`}
                                    min={minDate}
                                />
                                <ChevronDown
                                    size={15}
                                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                                />
                            </div>
                            <FieldError message={errors.deliveryDate?.message} />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Time
                            </label>
                            <div className="relative">
                                <input
                                    type="time"
                                    {...register("deliveryTime")}
                                    className={`${inputCls} pr-10`}
                                    min={selectedDate === minDate ? minTime : undefined}
                                />
                                <ChevronDown
                                    size={15}
                                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                                />
                            </div>
                            <FieldError message={errors.deliveryTime?.message} />
                        </div>
                    </div>

                    <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                        <Clock
                            size={14}
                            className="text-amber-500 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-xs text-amber-700">
                            Kindly note that any order made, we will need at least 24 hours to
                            process the delivery.
                        </p>
                    </div>
                </section>

                {/* ── Package Type ── */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader
                        icon={Package}
                        title="Delivery Package Type"
                        completed={false}
                    />

                    <Controller
                        name="packageTypeId"
                        control={control}
                        render={({ field }) => (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {packages.map((pkg) => {
                                    const isSelected: boolean = field.value === pkg._id;
                                    const PkgIcon: LucideIcon = pkg?.icon ?? Package;

                                    return (
                                        <div
                                            key={pkg._id}
                                            // type="button"
                                            onClick={() => field.onChange(pkg._id)}
                                            className={`relative text-left rounded-xl border-2 p-5 transition-all duration-200 ${isSelected
                                                ? "border-secondary shadow-md shadow-secondary/10"
                                                : "border-gray-200 hover:border-secondary/40"
                                                }`}
                                        >
                                            <div
                                                className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
                                                    ? "border-secondary bg-secondary"
                                                    : "border-gray-300"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                )}
                                            </div>


                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 mb-2">
                                                <Star size={9} />
                                                {/* {pkg.badge} */}
                                            </span>

                                            <p className="font-semibold text-gray-800 text-sm mb-1 font-[Playfair_Display]">
                                                {pkg.name}
                                            </p>

                                            <p
                                                className={`text-xl font-bold mb-3 ${pkg.price === 0
                                                    ? "text-[#4CAF50]"
                                                    : "text-secondary"
                                                    }`}
                                            >
                                                {pkg.price === 0 ? "Free" : formatKoboToNaira(pkg?.price)}
                                            </p>

                                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                                {pkg.description}
                                            </p>

                                            <div className="border-t border-gray-100 pt-3 space-y-1.5">
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-2">
                                                    Features
                                                </p>
                                                {pkg.features.map((feature: string, idx: number) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-1.5"
                                                    >
                                                        <div className="w-1 h-1 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                                                        <p className="text-xs text-gray-600">{feature}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => field.onChange(pkg._id)}
                                                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-semibold transition-colors ${isSelected
                                                    ? "bg-secondary text-white"
                                                    : "border border-secondary text-secondary hover:bg-secondary/5"
                                                    }`}
                                            >
                                                {isSelected ? "Default Packaging" : "Select Packaging"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    />
                    <FieldError message={errors.packageTypeId?.message} />
                </section>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader icon={CreditCard} title="Payment Method" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#4B0082] rounded-2xl p-6 text-white">
                            <h3 className="text-sm font-semibold mb-4 opacity-80">
                                Order Summary
                            </h3>
                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span className="opacity-70">Item&apos;s Total ({totalQuantity})</span>
                                    <span>{formatKoboToNaira(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-70">Delivery Fee</span>
                                    <span>{isNaN(deliveryFee) ? '₦0.00' : formatKoboToNaira(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-70">Package Fee</span>
                                    <span>{formatKoboToNaira(pkgFee)}</span>
                                </div>

                                <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-lg">
                                    <span>Amount to pay</span>
                                    <span>{formatKoboToNaira(finalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Select a Payment Option
                            </h3>
                            <Controller
                                name="paymentMethod"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        {paymentOptions.map((opt: PaymentOption) => {
                                            const OptIcon: LucideIcon = opt.icon;
                                            const isSelected: boolean = field.value === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => field.onChange(opt.id)}
                                                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${isSelected
                                                        ? "border-secondary bg-secondary/5 text-secondary"
                                                        : "border-gray-200 text-gray-700 hover:border-secondary/40"
                                                        }`}
                                                >
                                                    <OptIcon size={18} />
                                                    {opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            />
                            <FieldError message={errors.paymentMethod?.message} />

                            <div className="mt-4 flex items-center gap-2 text-xs text-amber-600">
                                <AlertCircle size={13} />
                                By proceeding, you are automatically accepting the Terms &amp;
                                Conditions
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex items-center justify-between pb-6">
                    <p className="text-xs text-gray-500">
                        Complete the steps and select a payment option in order to proceed.
                    </p>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${isValid
                            ? "bg-secondary text-white hover:bg-[#581c87] shadow-lg shadow-secondary/30"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {isValid ? `Proceed to Pay ${formatKoboToNaira(finalAmount)}` : "Proceed to Pay"}
                    </button>
                </div>
            </form>
        </div>
    );
}