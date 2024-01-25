import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";

const { width, height } = Dimensions.get("window");

/*****************************************/
// Get restaurant info from restaurant ID
/*****************************************/
async function fetchRestaurantInfo({
  restaurant_id,
}: {
  restaurant_id: string;
}) {
  let { data, error } = await supabase
    .from("Restaurant Table")
    .select("name,address")
    .eq("id", restaurant_id);
  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}

/********************************/
// Get reservations from user ID
/********************************/
async function fetchReservations({ user_id }: { user_id: string }) {
  let { data, error } = await supabase
    .from("Reservation Table")
    .select("id,restaurant,date,time,participants")
    .eq("user_id", user_id);
  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}

// Reservation Item, displays restaurant, location, date, and party size
function ReservationItem({ reservation }: { reservation: any }) {
  if (!reservation) return null;

  const [restaurantInfo, setRestaurantInfo] = useState<{
    name: string;
    address: string;
  }>({ name: "", address: "" });
  const [reservationDate, setReservationDate] = useState<string>("");

  // Get restaurant info
  useEffect(() => {
    fetchRestaurantInfo({ restaurant_id: reservation?.restaurant }).then(
      (data) => {
        if (data) {
          console.log("RESTAURANT INFO", data[0]);
          setRestaurantInfo({ name: data[0].name, address: data[0].address });
        }
      }
    );
  }, []);
  console.log("RESERVATION ITEM", reservation?.restaurant);

  // Format date
  useEffect(() => {
    if (reservation?.date) {
      const date = new Date(reservation?.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setReservationDate(formattedDate);
    }
  }, [reservation?.date]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#CE3535" }}>
          {restaurantInfo.name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 5 }}>
        <Ionicons name="location-outline" size={16} color="#8c8c8c" />
        <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
          {restaurantInfo.address}
        </Text>
      </View>
      <View style={{ flexDirection: "row", paddingBottom: 5 }}>
        <FontAwesome5 name="clock" size={16} color="#8c8c8c" />
        <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
          {reservationDate} at {reservation?.time}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="people-alt" size={16} color="#8c8c8c" />
        <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
          {reservation?.participants}
          {"  "}Participants
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ReservationsScreen() {
  const [reservations, setReservations] = useState<any[]>([]);

  // Get user session
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Get reservations from user ID
  useEffect(() => {
    if (session) {
      fetchReservations({ user_id: session?.user?.id }).then((data: any) => {
        if (data) {
          setReservations(data);
          console.log("RESERVATIONS", data);
        }
      });
    }
  }, [session]);

  return reservations.length > 0 ? (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {reservations.filter(Boolean).map((reservation, index) => {
        return <ReservationItem key={index} reservation={reservation} />;
      })}
      <View style={{ height: 20 }}></View>
    </ScrollView>
  ) : (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 15, color: "#5e5e5e" }}>
        You currently don't have any reservations!
      </Text>
    </View>
  );
}
