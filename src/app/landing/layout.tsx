"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "next-themes";
import ProtectionProvider from "@/providers/ProtectionProvider";
import { useUser } from "@/providers/UserProvider";
import Header from "@/components/Header";
import MobileHeader from "@/components/Mobile-Header";

export default function Home({
  commonPeople,
  business,
  manureBuyer,
  foodBanks,
}: {
  commonPeople: React.ReactNode;
  business: React.ReactNode;
  manureBuyer: React.ReactNode;
  foodBanks: React.ReactNode;
}) {
  const { theme } = useTheme();
  const { user } = useUser();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async ({ uid }: { uid: string }) => {
      if (!uid) return;
      let userRef = doc(db, "CommonPeople", uid);
      let docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        userRef = doc(db, "Business", uid);
        docSnap = await getDoc(userRef);
        setUserType("business");

        if (!docSnap.exists()) {
          userRef = doc(db, "ManureBuyer", uid);
          docSnap = await getDoc(userRef);
          setUserType("manureBuyer");

          if (!docSnap.exists()) {
            userRef = doc(db, "FoodBanks", uid);
            docSnap = await getDoc(userRef);
            setUserType("foodBanks");
          }

        }

      }
      
      else{
        setUserType(docSnap.data()?.type);
      };
    };

    fetchUserType({ uid: user?.uid || "" });
  }, []);

  return (
    <ProtectionProvider>
      <div className={`min-h-screen w-full ${theme}`}>
      <Header userType={userType ? userType : ""} />
      <MobileHeader userType={userType ? userType : ""} />
        <div className="flex flex-col mt-4">
          {userType == "commonPeople" && commonPeople}
          {userType == "business" && business}
          {userType == "manureBuyer" && manureBuyer}
          {userType == "foodBanks" && foodBanks}
        </div>
      </div>
    </ProtectionProvider>
  );
}
