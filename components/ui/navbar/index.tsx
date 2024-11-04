"use client"
import { useEffect, useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "../svg/AcmeLogo";
import { SearchIcon } from "../svg/SearchIcon.jsx";
import { useLogoutMutation } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useMeMutation } from "@/store/UserStore";

export default function Header() {
    const [logout] = useLogoutMutation();
    const [me] = useMeMutation();
    const [userData, setUserData] = useState({ userName: null, email: null });
    const router = useRouter();

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const { data } = await me();
                setUserData({
                    userName: data?.data?.userName as any,
                    email: data?.data?.email as any
                });
            } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
            }
        };

        fetchMe();
    }, [me]);

    const logouts = async () => {
        await logout();
        router.push("/login");
    };

    const goToProfile = () => {
        if (userData.userName) {
            router.push(`/profile/${userData.userName}`);
        }
    };

    return (
        <Navbar isBordered maxWidth="xl" >
            <NavbarContent>
                <div className="flex flex-row items-center mr-4">
                    <AcmeLogo />
                    <p className="hidden sm:block font-bold text-inherit">ACME</p>
                </div>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem>
                        <Link color="foreground" href="/mybook">
                            My Book
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/community" aria-current="page" color="foreground" >
                            Community
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/stats">
                            Stats
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[18rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Search Book"
                    size="sm"
                    startContent={<SearchIcon size={12} width={12} height={12} />}
                    type="search"
                />
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{userData.email}</p>
                        </DropdownItem>
                        <DropdownItem key="profile" onClick={goToProfile}>Profile</DropdownItem>
                        <DropdownItem key="/settings" href="/settings">Settings</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="logout" color="danger" href="/login" onClick={() => logouts()}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}