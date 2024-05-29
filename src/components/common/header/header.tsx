"use client";
import Image from "next/image";
import {
  FooterStyled,
  HeaderContainerStyled,
  LandingActionsStyled,
  StyledButton,
} from "./header.styled";
import { Select, DatePicker, message } from "antd";
import { LoginComponent } from "@/components/utilities/loginComponent/login.component";
import { useLandingPageStore } from "@/stores";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchPlaceRepo } from "@/repositories";
import { useDebounce } from "@/utils";

type SelectModel = { label: string; value: string };
export const Header = () => {
  const { setStore, startDate, endDate, destination } = useLandingPageStore();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [currSearch, setCurrSearch] = useState("");
  const {
    places,
    searchPlaces,
    isPending: isLoadingSearchPlace,
  } = useSearchPlaceRepo();
  const [placesSelectData, setPlacesSelectData] = useState<SelectModel[]>([]);

  const onSelectPlace = (destination: string) => {
    setStore({ destination });
    setCurrSearch("");
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: SelectModel) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onClickStartNow = () => {
    if (!startDate || !endDate || !destination) {
      messageApi.error("Please fill in desination and start/end date");
    } else {
      router.push("/app/reference");
    }
  };

  const { RangePicker } = DatePicker;

  useDebounce(
    () => !!currSearch.length && searchPlaces({ value: currSearch }),
    300,
    [currSearch]
  );

  useEffect(() => {
    if (places === undefined) return;

    setPlacesSelectData(
      places.map((place) => ({
        label: place,
        value: place,
      }))
    );
  }, [places]);

  return (
    <>
      {contextHolder}
      <HeaderContainerStyled>
        <div className="logo-container">
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <div className="menu-list-container">
          <Link href="/app/reference">Reference</Link>
          <Link href="/app/chat">Chat</Link>
          <LoginComponent />
        </div>
      </HeaderContainerStyled>
      <LandingActionsStyled>
        <div className="img-container">
          <Image src="/landing.png" alt="landing" fill={true} />
        </div>
        <h2>Your world of joy</h2>
        <p>
          From local escapes to far-flung adventures, find what makes you happy
          anytime, anywhere
        </p>
        <div className="actions-container">
          <Select
            showSearch
            placeholder="Type your place"
            optionFilterProp="children"
            onChange={onSelectPlace}
            onSearch={setCurrSearch}
            filterOption={filterOption}
            options={placesSelectData}
            loading={isLoadingSearchPlace}
          />
          <RangePicker
            defaultValue={[
              dayjs(startDate) || undefined,
              dayjs(endDate) || undefined,
            ]}
            disabledDate={(current) => {
              // Can not select days before today
              return current && current < dayjs().startOf("day");
            }}
            onChange={(data) => {
              setStore({
                startDate: dayjs(data?.[0]).format("YYYY-MM-DD"),
                endDate: dayjs(data?.[1]).format("YYYY-MM-DD"),
              });
            }}
          />
          <StyledButton onClick={onClickStartNow}>Start Now</StyledButton>
        </div>
      </LandingActionsStyled>
      <FooterStyled>
        <div className="footer-bg">
          <Image src="/bg-footer.svg" alt="landing" fill={true} />
        </div>
        <div className="content-container">
          <div>
            <h3>Contact</h3>
            <p>328 Queensberry Street, North Melbourne VIC3051, Australia.</p>
            <p>hi@viatours.com</p>
          </div>
          <div>
            <h3>Company</h3>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Travel Guides</p>
            <p>Data Policy</p>
          </div>
          <div>
            <h3>Support</h3>
            <p>Get In Touch</p>
            <p>Help Center</p>
          </div>
          <div>
            <h3>Introductions</h3>
            <p>Live Chat</p>
            <p>How It Works</p>
          </div>
        </div>
      </FooterStyled>
    </>
  );
};

// list of country in the world with label and value property
const countries = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Argentina", value: "Argentina" },
  { label: "Australia", value: "Australia" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Mexico", value: "Mexico" },
  { label: "Russia", value: "Russia" },
  { label: "Spain", value: "Spain" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" },
  { label: "Austria", value: "Austria" },
  { label: "Belgium", value: "Belgium" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Estonia", value: "Estonia" },
  { label: "Finland", value: "Finland" },
  { label: "Greece", value: "Greece" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "Ireland", value: "Ireland" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Malta", value: "Malta" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "Norway", value: "Norway" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Romania", value: "Romania" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Turkey", value: "Turkey" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "Argentina", value: "Argentina" },
  { label: "Brazil", value: "Brazil" },
  { label: "Chile", value: "Chile" },
  { label: "Colombia", value: "Colombia" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Venezuela", value: "Venezuela" },
];
