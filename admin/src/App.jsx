import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Sidbar/Layout";
import React from "react";
import Course from "./pages/Course";
import Banner from "./pages/Banner";
import CourseDisplay from "./pages/CourseDisplay";
import Bannerdisplay from "./pages/Bannerdisplay";
import QueryDisplay from "./pages/QueryDisplay";
import SuccessStory from "./pages/SuccessStory";
import SucessStroydisplay from "./pages/SucessStroydisplay";
import CategoryManagement from "./pages/CategoryManagement";
import EnquiryDisplay from "./pages/EnquiryDisplay";
import ContactDisplay from "./pages/Contact/ContactDisplay";
import EnrollDisplay from "./pages/Enroll/EnrollDisplay";
import WhatsNew from "./pages/WhatsNew/WhatsNew";
import DisplayWhatsNew from "./pages/WhatsNew/DisplayWhatsNew";
import Blog from "./pages/Blog";
import BlogDisplay from "./pages/BlogDisplay";
import TeamMember from "./pages/TeamMember";
import TeamMemberdisplay from "./pages/TeamMemberdisplay";
import Choose from "./pages/Choose";
import ChooseDisplay from "./pages/ChooseDisplay";
import Syllabus from "./pages/Syllabus";
import SyllabusDisplay from "./pages/SyllabusDisplay";
import CourseForm from "./pages/pretest/test";
import MainForm from "./pages/Main/main";
import PreDisplay from "./pages/pretest/predisplay";
import MainDisplay from "./pages/Main/displaymain";
import CallbackpopShow from "./pages/CallbackPop/CallbackpopShow";
import JudgementForm from "./pages/judegment/judegment";
import JudegementDisplay from "./pages/judegment/judegementDisplay";
import Event from "./pages/Event/Event";
import Eventdisplay from "./pages/Event/Eventdisplay";
import URL from "./pages/URL/URL";
import URLdisplay from "./pages/URL/URLdisplay";
import Dashboard from "./Dashboard/Dashbaord";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import PrivateRoute from "./Component/PrivateRoute";
import SubCategoryManagement from "./pages/SubCategory/SubCategory";
import JudementCategory from "./pages/JudementCategory/JudementCategory";
import BlogCategory from "./pages/BlogCategory/BlogCategory";
import ForgotPassword from "./Admin/ForgetPassword";
import VerifyOTP from "./Admin/Verify";
import ResetPassword from "./Admin/ResetPassword";
import Discount from "./pages/Discount/Discount";
import Discountdisplay from "./pages/Discount/Discountdislay";
import FAQCreate from "./pages/FAQ/FAQCreate";
import FAQDisplay from "./pages/FAQ/FAQDisplay";
import SubsubCategoryManagement from "./pages/SubCategory/subsubCategory";
import SyllabusCategory from "./pages/SyallbusCategory/SyllabusCategory";
import Refund from "./Refund/Refund";
import Dynamic from "./pages/Dynamic/Dynamic";
import CreateCourse from "./OtherCourse/OtherCourse";
import OtherCoursediplay from "./OtherCourse/OtherCoursediplay";
import SyllabusEnquiryDisplay from "./SyllabusEnquiry/SyllabusEnquiryDiplay";
import SocialMedia from "./SocialMedia/SocialMedia";
import SocialMediaDisplay from "./SocialMedia/SocialMediaDisplay";
import PlayStore from "./Playstore/PlayStore";
import AddSEO from "./Component/AddSEO";
import SEOManager from "./pages/seo/SEOManager";
import GeneratedUrls from "./pages/seo/GeneratedUrls";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Layout />}>
            <Route path='/generated-url' element={<GeneratedUrls />} />
            <Route path='/seo-manager' element={<SEOManager />} />
            <Route index element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/SEO' element={<AddSEO />} />
            <Route path='/courses' element={<Course />} />
            <Route path='/banner' element={<Banner />} />
            <Route path='/allcourse' element={<CourseDisplay />} />
            <Route path='/allbanner' element={<Bannerdisplay />} />
            <Route path='/allquerydisplay' element={<QueryDisplay />} />
            <Route path='/sucessStory' element={<SuccessStory />} />
            <Route
              path='/sucessStorydisplay'
              element={<SucessStroydisplay />}
            />
            <Route path='/categories' element={<CategoryManagement />} />
            <Route path='/enquirydisplay' element={<EnquiryDisplay />} />
            <Route path='/contactdisplay' element={<ContactDisplay />} />
            <Route path='/enroll' element={<EnrollDisplay />} />
            <Route path='/whatsnew' element={<WhatsNew />} />
            <Route path='/whatsnewdisplay' element={<DisplayWhatsNew />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blogdisplay' element={<BlogDisplay />} />
            <Route path='/member' element={<TeamMember />} />
            <Route path='/memberdisplay' element={<TeamMemberdisplay />} />
            <Route path='/choose' element={<Choose />} />
            <Route path='/choosedisplay' element={<ChooseDisplay />} />
            <Route path='/syllabus' element={<Syllabus />} />
            <Route path='/syllabusdisplay' element={<SyllabusDisplay />} />
            <Route path='/test' element={<CourseForm />} />
            <Route path='/main' element={<MainForm />} />
            <Route path='/predisplay' element={<PreDisplay />} />
            <Route path='/maindisplay' element={<MainDisplay />} />
            <Route path='/callbackpop' element={<CallbackpopShow />} />
            <Route path='/judement' element={<JudgementForm />} />
            <Route path='/judementshow' element={<JudegementDisplay />} />
            <Route path='/event' element={<Event />} />
            <Route path='/eventdisplay' element={<Eventdisplay />} />
            <Route path='/url' element={<URL />} />
            <Route path='/urlshow' element={<URLdisplay />} />
            <Route path='/subcategory' element={<SubCategoryManagement />} />
            <Route path='/judementcategory' element={<JudementCategory />} />
            <Route path='/blogcategory' element={<BlogCategory />} />
            <Route path='/discount' element={<Discount />} />
            <Route path='/discountshow' element={<Discountdisplay />} />
            <Route path='/faq' element={<FAQCreate />} />
            <Route path='/faqshow' element={<FAQDisplay />} />
            <Route
              path='/subsubcategory'
              element={<SubsubCategoryManagement />}
            />
            <Route path='/syllabuscategory' element={<SyllabusCategory />} />
            <Route path='/refund' element={<Refund />} />
            <Route path='/dynamic' element={<Dynamic />} />
            <Route path='/othercourse' element={<CreateCourse />} />
            <Route path='/otherdisplay' element={<OtherCoursediplay />} />
            <Route
              path='/syllabusstudent'
              element={<SyllabusEnquiryDisplay />}
            />
            <Route path='/socialmedia' element={<SocialMedia />} />
            <Route
              path='/socialmediadisplay'
              element={<SocialMediaDisplay />}
            />
            <Route path='/playstore' element={<PlayStore />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
