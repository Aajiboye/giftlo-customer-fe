"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { LabeledInput as Input } from "@/components/ui/labeledInput";
import { Button } from "@/components/ui/button";
import { Phone, Bell, ToggleLeft, ToggleRight } from "lucide-react";
import { LabeledSelect, SelectItem } from "@/components/ui/labeledSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useCentral } from "@/context/CentralContext";
import { usePostItem, usePutItem } from "@/utilities/useQuery";
import { toast } from 'sonner';
import { formatDateForInput } from "@/lib/date";

type Props = {
    profile: User
}

const profileSchema = z.object({
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "other"]),
    phone: z.string().min(10, "Phone number is required"),
    country: z.string().min(1),
    state: z.string().min(1),
    localGovernmentArea: z.string().min(1),
    postalCode: z.string().min(4),
    address: z.string().min(3),
    termsAccepted: z.boolean().optional(),
    notificationPreferences: z.object({
        allMedium: z.boolean().optional(),
        emailNotification: z.boolean().optional(),
        smsNotification: z.boolean().optional(),
        pushNotification: z.boolean().optional(),
    }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;


export default function ProfileForm({ profile }: Props) {
    const { states, lgas, activeState, setActiveState, isFetchingLGA, isFetchingStates } = useCentral();

    const [isNotification, setIsNotification] = useState(true)
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            country: "Nigeria",
            notificationPreferences: {
                allMedium: true,
                emailNotification: false,
                smsNotification: false,
                pushNotification: false,
            },
            dob: formatDateForInput(profile?.dob) || '',
            gender: profile?.gender || 'male',
            phone: profile?.phone,
            termsAccepted: profile.termsAccepted || false,
            state: profile?.state || '',
            localGovernmentArea: profile?.localGovernmentArea || '',
            postalCode: profile?.postalCode || '',
            address: profile?.address || '',
        },
    });

    useEffect(() => {
        form.reset({
            country: "Nigeria",
            notificationPreferences: profile.notificationPreferences || {
                allMedium: true,
                emailNotification: false,
                smsNotification: false,
                pushNotification: false
            },
            dob: formatDateForInput(profile?.dob) || '',
            gender: profile?.gender || 'male',
            phone: profile?.phone,
            termsAccepted: isNotification || profile.termsAccepted || false,
            state: profile?.state || '',
            localGovernmentArea: profile?.localGovernmentArea || '',
            postalCode: profile?.postalCode || '',
            address: profile?.address || '',
        })

        if(profile?.state) setActiveState(profile?.state)

    }, [profile, states])

    useEffect(() => {
        form.setValue('termsAccepted', isNotification)
    }, [isNotification])

    const { mutateAsync, isPending } = usePutItem("app", ["/v1/customer/profile"], form.getValues(), '/customer/profile', false);

    async function onSubmit(values: ProfileFormValues) {
        console.log(values);

        try {
            const data: any = await mutateAsync();

            console.log({ data })


            toast.success('Profile update successful - Nicely done');

        } catch (error: any) {

            toast.error(
                `${error}`
            );
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl space-y-6"
            >

                <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    disabled={true}
                    value={profile?.fullName}
                />



                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address here"
                    disabled={true}
                    value={profile?.email}
                />


                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input label="D.O.B" type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <LabeledSelect
                                        label="Gender"
                                        placeholder="Select Gender"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={!!fieldState.error}
                                    >
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </LabeledSelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    label="Phone Number"
                                    placeholder="+234 123 456 7890"
                                    // icon={<Phone size={16} />}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input label="Country" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <LabeledSelect
                                        label="State"
                                        placeholder={isFetchingStates ? "Loading states..." : "Select State"}
                                        value={field.value}
                                        disabled={isFetchingStates}
                                        onValueChange={(value) => {
                                            setActiveState(value)
                                            field.onChange(value);
                                        }}
                                        error={!!fieldState.error}
                                    >
                                        {states?.map((state, index) => <SelectItem value={state} key={index}>{state}</SelectItem>)}
                                    </LabeledSelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">


                    <FormField
                        control={form.control}
                        name="localGovernmentArea"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <LabeledSelect
                                        label="Local Government"
                                        placeholder={isFetchingLGA ? "Loading LGAs..." : "Select Local Government"}
                                        disabled={isFetchingLGA}
                                        value={field.value}
                                        onValueChange={(value) => {
                                            // setActiveState(value)
                                            field.onChange(value);
                                        }}
                                        error={!!fieldState.error}
                                    >
                                        {lgas?.map((lga, index) => <SelectItem value={lga} key={index}>{lga}</SelectItem>)}
                                    </LabeledSelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input label="Postal Code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    label="Street Address"
                                    placeholder="Enter your address here"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium justify-between">
                        <p className="text-secondary">Notification Preference</p>
                        <hr className="w-2/3" />
                    </div>


                    <div className="flex items-center gap-2 font-medium justify-between">
                        <p className="text-light font-light text-xs">By registering, you agree to our Terms and Conditions and Privacy Policy. Please ensure you have read and understood</p>
                        <div className="" onClick={() => setIsNotification(!isNotification)}>
                            {isNotification ? <ToggleRight className="text-secondary" /> : <ToggleLeft className="text-secondary" />}
                            {/* {!isNotification && <p className="text-danger text-xxs font-light">Required</p>} */}
                        </div>
                    </div>

                    <div className="flex gap-4 text-xs">
                        <p className="">Select Preferred Medium:</p>
                        <FormField
                            control={form.control}
                            name="notificationPreferences.allMedium"
                            render={({ field }) => (
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={field.value ?? false}
                                        onCheckedChange={field.onChange}
                                    />
                                    All Medium
                                </label>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notificationPreferences.emailNotification"
                            render={({ field }) => (
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={field.value ?? false}
                                        onCheckedChange={field.onChange}
                                    />
                                    Email Notification
                                </label>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notificationPreferences.smsNotification"
                            render={({ field }) => (
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={field.value ?? false}
                                        onCheckedChange={field.onChange}
                                    />
                                    SMS Notification
                                </label>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notificationPreferences.pushNotification"
                            render={({ field }) => (
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={field.value ?? false}
                                        onCheckedChange={field.onChange}
                                    />
                                    Push Notification
                                </label>
                            )}
                        />
                    </div>


                </div>

                <Button type="submit" className="w-full bg-secondary" isLoading={isPending}>
                    Save Changes
                </Button>
            </form>
        </Form>
    );
}
