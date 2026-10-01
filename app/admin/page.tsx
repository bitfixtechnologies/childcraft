"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

interface BannerItem {
  _id: string;
  index: number;
  imageUrl: string;
}

interface OfferItem {
  _id: string;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  createdAt: string;
}

interface BookItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  std: string;
  description: string;
  index: number;
}

const TEXTBOOK_CATEGORIES = [
  {
    name: "Core Series",
    series: [
      "Wings (S&T)",
      "Pearls & Petals (S&T)",
      "Nexus (T)",
      "Nexus Plus (T)",
      "Next Generation (T)",
      "Golden Wings (T)",
      "Green Planet"
    ]
  },
  {
    name: "Languages",
    series: [
      "Manjadi",
      "Malayala Manjari",
      "Basha Tarang",
      "Lipi Sagaram",
      "Hindi Praveshika",
      "Sarovar 1-5",
      "Madhuri Hindi Reader"
    ]
  },
  {
    name: "Grammar & English",
    series: [
      "Active Grammar 1-8",
      "Basic Grammar",
      "Graded English",
      "Active English (Reader)"
    ]
  },
  {
    name: "Computers & GK",
    series: [
      "IT Exploring e-World",
      "Smart Computer",
      "World of Computer",
      "GK - Fun & Facts",
      "GK – Explore the World"
    ]
  },
  {
    name: "Writing & Art",
    series: [
      "Fun with Crayon",
      "Sulekh Mala Handwriting",
      "Vivanta",
      "Capital and Small Letters",
      "Magic of Art",
      "Cursive Writing",
      "Draw & Colour",
      "Art & Activity",
      "ABC Writing Capital and Small",
      "Aalekhanamithram - Malayalam Writing"
    ]
  }
];

// Mock data for Book outline management (since it is static in frontend)
interface BookOutlineItem {
  id: number;
  text: string;
  color: string;
}

// Mock data for contact inquiries
interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Reviewed" | "Resolved";
  createdAt: string;
}

interface GalleryItem {
  _id: string;
  imageUrl: string;
  title: string;
  index: number;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "banners" | "offers" | "textbooks" | "positions" | "book-series" | "gallery">("overview");

  // Common states
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Career Positions states
  interface PositionItem {
    _id: string;
    title: string;
    department: string;
    type: string;
    description: string;
    requirements: string[];
    createdAt: string;
  }
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState<PositionItem | null>(null);
  const [posTitle, setPosTitle] = useState("");
  const [posDept, setPosDept] = useState("Editorial & Content Development");
  const [posType, setPosType] = useState("Full-Time / Hybrid");
  const [posDescription, setPosDescription] = useState("");
  const [posRequirementsText, setPosRequirementsText] = useState("");
  const [posSaving, setPosSaving] = useState(false);

  // Textbook Showcase states
  const [showcaseBooks, setShowcaseBooks] = useState<BookItem[]>([]);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<BookItem | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookImageUrl, setBookImageUrl] = useState("");
  const [categoryGroup, setCategoryGroup] = useState("Core Series");
  const [bookCategory, setBookCategory] = useState("Wings (S&T)");
  const [customCategoryGroup, setCustomCategoryGroup] = useState("");
  const [customBookCategory, setCustomBookCategory] = useState("");
  const [bookStd, setBookStd] = useState("Grade 1");
  const [bookDescription, setBookDescription] = useState("");
  const [bookIndex, setBookIndex] = useState(0);
  const [bookSaving, setBookSaving] = useState(false);
  const [bookUploadMode, setBookUploadMode] = useState<"link" | "file">("link");
  const [bookUploadingFile, setBookUploadingFile] = useState(false);
  const [bookUploadError, setBookUploadError] = useState<string | null>(null);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStd, setFilterStd] = useState("All");

  // Keep bookCategory in sync with categoryGroup if the selected group changes
  useEffect(() => {
    const group = TEXTBOOK_CATEGORIES.find(g => g.name === categoryGroup);
    if (group && group.series.length > 0) {
      if (!group.series.includes(bookCategory)) {
        setBookCategory(group.series[0]);
      }
    }
  }, [categoryGroup]);

  const filteredBooks = showcaseBooks.filter((book) => {
    const catMatch = filterCategory === "All" || book.category === filterCategory;
    const stdMatch = filterStd === "All" || book.std === filterStd;
    return catMatch && stdMatch;
  });

  // Banners state
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerSaving, setBannerSaving] = useState(false);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [uploadMode, setUploadMode] = useState<"link" | "file">("link");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Offers state
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [offerTag, setOfferTag] = useState("Limited Time Offer");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerBtnText, setOfferBtnText] = useState("Learn More");
  const [offerBtnLink, setOfferBtnLink] = useState("/contact");
  const [offerIsActive, setOfferIsActive] = useState(false);
  const [offerSaving, setOfferSaving] = useState(false);

  // Outlines state (Mock)
  const [bookOutlines, setBookOutlines] = useState<BookOutlineItem[]>([
    { id: 1, text: "Colourful and attractive", color: "bg-green-600" },
    { id: 2, text: "Clear, Simple and Precise", color: "bg-orange-500" },
    { id: 3, text: "Activity based worksheets and assessments", color: "bg-rose-500" },
    { id: 4, text: "Concepts are supported by suitable examples", color: "bg-blue-600" },
    { id: 5, text: "Content is age-appropriate", color: "bg-blue-600" },
    { id: 6, text: "Student, Teacher, and Parent friendly books", color: "bg-orange-500" },
    { id: 7, text: "Each subject book has proper planning for lesson support", color: "bg-slate-400" },
  ]);

  // Enquiries state (Mock)
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    {
      _id: "enq1",
      name: "Principal Sarah Jenkins",
      email: "sjenkins@greenwoodschool.edu",
      phone: "+91 98765 43210",
      subject: "Institutional Bulk Order Request",
      message: "We would like to request specimen copies of English Reader and Mathematics textbooks for Std 1 and Std 2. Our school Greenwood International is planning to adopt new textbooks for the 2026 Academic Season.",
      status: "New",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
    },
    {
      _id: "enq2",
      name: "Rohan Sharma",
      email: "rohan.sharma@primaryedu.org",
      phone: "+91 91234 56789",
      subject: "Teacher Training Workshop Enquiry",
      message: "Hello, we adopted Hallmark Publishers books for Std 3 and Std 4 this year. We want to schedule the faculty orientation workshop next month. Please get back to us with available dates.",
      status: "Reviewed",
      createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString() // 3 days ago
    }
  ]);

  // Book Series Outline states
  interface BookSeriesItem {
    _id: string;
    name: string;
    label: string;
    classes: string;
    gradient: string;
    image: string;
    index: number;
  }
  const [bookSeriesList, setBookSeriesList] = useState<BookSeriesItem[]>([]);
  const [showSeriesForm, setShowSeriesForm] = useState(false);
  const [editingSeries, setEditingSeries] = useState<BookSeriesItem | null>(null);
  const [seriesName, setSeriesName] = useState("");
  const [seriesLabel, setSeriesLabel] = useState("");
  const [seriesClasses, setSeriesClasses] = useState("");
  const [seriesGradient, setSeriesGradient] = useState("from-blue-600 to-indigo-700");
  const [seriesImageUrl, setSeriesImageUrl] = useState("");
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [seriesSaving, setSeriesSaving] = useState(false);
  const [seriesUploadMode, setSeriesUploadMode] = useState<"link" | "file">("link");
  const [seriesUploadingFile, setSeriesUploadingFile] = useState(false);
  const [seriesUploadError, setSeriesUploadError] = useState<string | null>(null);

  // Gallery Management States
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryImageUrl, setGalleryImageUrl] = useState("");
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [galleryUploadMode, setGalleryUploadMode] = useState<"link" | "file">("link");
  const [galleryUploadingFile, setGalleryUploadingFile] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery`);
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a: GalleryItem, b: GalleryItem) => a.index - b.index);
        setGalleryItems(sorted);
      }
    } catch (err) {
      console.error("Error fetching gallery items:", err);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/banner`);
      if (res.ok) {
        const data = await res.json();
        // Sort items by index
        const sorted = data.sort((a: BannerItem, b: BannerItem) => a.index - b.index);
        setBanners(sorted);
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  const fetchOffers = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/offer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/books`);
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a: BookItem, b: BookItem) => a.index - b.index);
        setShowcaseBooks(sorted);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/positions`);
      if (res.ok) {
        const data = await res.json();
        setPositions(data);
      }
    } catch (err) {
      console.error("Error fetching career positions:", err);
    }
  };

  const fetchBookSeries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/book-outlines`);
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a: BookSeriesItem, b: BookSeriesItem) => a.index - b.index);
        setBookSeriesList(sorted);
      }
    } catch (err) {
      console.error("Error fetching book outlines:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBanners(), 
        fetchOffers(), 
        fetchBooks(), 
        fetchPositions(),
        fetchBookSeries(),
        fetchGalleryItems()
      ]);
      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  // BANNER HANDLERS
  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");

    try {
      let res;
      if (editingBanner) {
        // Update existing banner by ID
        res = await fetch(`${API_BASE_URL}/api/banner/id/${editingBanner._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageUrl: bannerImageUrl }),
        });
      } else {
        // Create new banner
        res = await fetch(`${API_BASE_URL}/api/banner`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageUrl: bannerImageUrl }),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingBanner ? "Banner image updated successfully!" : "New banner image added successfully!",
        });
        resetBannerForm();
        await fetchBanners();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save banner." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error connecting to server." });
    } finally {
      setBannerSaving(false);
    }
  };

  const handleEditBanner = (banner: BannerItem) => {
    setEditingBanner(banner);
    setBannerImageUrl(banner.imageUrl);
    setShowBannerForm(true);
    document.getElementById("banner-form-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteBanner = async (id: string) => {
    setMessage(null);
    if (banners.length <= 5) {
      setMessage({
        type: "error",
        text: "Cannot delete. A minimum of 5 banner images is required to maintain the slideshow loop.",
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this banner image?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/banner/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Banner image deleted successfully!" });
        await fetchBanners();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to delete banner." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error deleting banner." });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setUploadError(null);
    setMessage(null);

    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setBannerImageUrl(data.url);
        setMessage({ type: "success", text: "Image uploaded to Cloudinary successfully!" });
      } else {
        setUploadError(data.message || "Failed to upload image.");
        setMessage({ type: "error", text: data.message || "Failed to upload image." });
      }
    } catch (err) {
      console.error(err);
      setUploadError("Error uploading file to server.");
      setMessage({ type: "error", text: "Error uploading file to server." });
    } finally {
      setUploadingFile(false);
    }
  };

  const resetBannerForm = () => {
    setEditingBanner(null);
    setBannerImageUrl("");
    setShowBannerForm(false);
    setUploadMode("link");
    setUploadError(null);
    setUploadingFile(false);
  };

  // GALLERY HANDLERS
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGallerySaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");

    const payload = {
      imageUrl: galleryImageUrl,
      title: galleryTitle,
      index: Number(galleryIndex),
    };

    try {
      let res;
      if (editingGalleryItem) {
        res = await fetch(`${API_BASE_URL}/api/gallery/${editingGalleryItem._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/gallery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingGalleryItem ? "Gallery image updated successfully!" : "Gallery image added successfully!",
        });
        resetGalleryForm();
        await fetchGalleryItems();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save gallery item." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error connecting to server." });
    } finally {
      setGallerySaving(false);
    }
  };

  const startEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryImageUrl(item.imageUrl);
    setGalleryTitle(item.title);
    setGalleryIndex(item.index);
    setGalleryUploadMode("link");
    setGalleryUploadError(null);
    setShowGalleryForm(true);
    setTimeout(() => {
      document.getElementById("gallery-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this gallery image?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Gallery image deleted successfully!" });
        await fetchGalleryItems();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to delete gallery image." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error deleting gallery image." });
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGalleryUploadingFile(true);
    setGalleryUploadError(null);
    setMessage(null);

    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setGalleryImageUrl(data.url);
        setMessage({ type: "success", text: "Image uploaded to Cloudinary successfully!" });
      } else {
        setGalleryUploadError(data.message || "Failed to upload image.");
        setMessage({ type: "error", text: data.message || "Failed to upload image." });
      }
    } catch (err) {
      console.error(err);
      setGalleryUploadError("Error uploading file to server.");
      setMessage({ type: "error", text: "Error uploading file to server." });
    } finally {
      setGalleryUploadingFile(false);
    }
  };

  const resetGalleryForm = () => {
    setEditingGalleryItem(null);
    setGalleryImageUrl("");
    setGalleryTitle("");
    setGalleryIndex(0);
    setGalleryUploadMode("link");
    setGalleryUploadError(null);
    setGalleryUploadingFile(false);
    setShowGalleryForm(false);
  };

  // OFFER HANDLERS
  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");
    const payload = {
      tag: offerTag,
      title: offerTitle,
      description: offerDescription,
      buttonText: offerBtnText,
      buttonLink: offerBtnLink,
      isActive: offerIsActive,
    };

    try {
      let res;
      if (editingOffer) {
        res = await fetch(`${API_BASE_URL}/api/offer/${editingOffer._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/offer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingOffer ? "Offer updated successfully!" : "Offer created successfully!",
        });
        resetOfferForm();
        await fetchOffers();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save offer." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error saving offer." });
    } finally {
      setOfferSaving(false);
    }
  };

  const startEditOffer = (offer: OfferItem) => {
    setEditingOffer(offer);
    setOfferTag(offer.tag);
    setOfferTitle(offer.title);
    setOfferDescription(offer.description);
    setOfferBtnText(offer.buttonText);
    setOfferBtnLink(offer.buttonLink);
    setOfferIsActive(offer.isActive);
    setShowOfferForm(true);
    document.getElementById("offer-form-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/offer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Offer deleted successfully!" });
        await fetchOffers();
      } else {
        setMessage({ type: "error", text: "Failed to delete offer." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting offer." });
    }
  };

  const handleToggleActivation = async (id: string, currentlyActive: boolean) => {
    const token = localStorage.getItem("adminToken");
    const endpoint = currentlyActive ? "deactivate" : "activate";
    try {
      const res = await fetch(`${API_BASE_URL}/api/offer/${id}/${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: currentlyActive ? "Offer deactivated successfully!" : "Offer activated successfully!",
        });
        await fetchOffers();
      } else {
        setMessage({ type: "error", text: "Failed to update offer status." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error updating offer status." });
    }
  };

  const resetOfferForm = () => {
    setEditingOffer(null);
    setOfferTag("Limited Time Offer");
    setOfferTitle("");
    setOfferDescription("");
    setOfferBtnText("Learn More");
    setOfferBtnLink("/contact");
    setOfferIsActive(false);
    setShowOfferForm(false);
  };

  // MOCK ACTIONS FOR EXTRA SECTIONS
  const handleToggleEnquiryStatus = (id: string) => {
    setEnquiries(prev =>
      prev.map(enq => {
        if (enq._id === id) {
          const nextStatusMap: Record<string, "New" | "Reviewed" | "Resolved"> = {
            New: "Reviewed",
            Reviewed: "Resolved",
            Resolved: "New"
          };
          return { ...enq, status: nextStatusMap[enq.status] };
        }
        return enq;
      })
    );
    setMessage({ type: "success", text: "Enquiry status updated successfully!" });
  };

  const handleDeleteEnquiry = (id: string) => {
    if (!window.confirm("Delete this inquiry?")) return;
    setEnquiries(prev => prev.filter(enq => enq._id !== id));
    setMessage({ type: "success", text: "Enquiry removed from records." });
  };

  // TEXTBOOK SHOWCASE HANDLERS
  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookSaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");

    const finalCategory = bookCategory === "custom" ? customBookCategory : bookCategory;

    const payload = {
      title: bookTitle,
      image: bookImageUrl,
      category: finalCategory,
      std: bookStd,
      description: bookDescription,
      index: bookIndex,
    };

    try {
      let res;
      if (editingBook) {
        res = await fetch(`${API_BASE_URL}/api/books/${editingBook._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: editingBook ? "Book updated successfully!" : "Book added to showcase successfully!",
        });
        await fetchBooks();
        resetBookForm();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save book." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error connection to server." });
    } finally {
      setBookSaving(false);
    }
  };

  const handleBookImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBookUploadingFile(true);
    setBookUploadError(null);
    setMessage(null);

    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setBookImageUrl(data.url);
        setMessage({ type: "success", text: "Book image uploaded to Cloudinary successfully!" });
      } else {
        setBookUploadError(data.message || "Failed to upload image.");
        setMessage({ type: "error", text: data.message || "Failed to upload image." });
      }
    } catch (err) {
      console.error(err);
      setBookUploadError("Error uploading file to server.");
      setMessage({ type: "error", text: "Error uploading file to server." });
    } finally {
      setBookUploadingFile(false);
    }
  };

  const startEditBook = (book: BookItem) => {
    setEditingBook(book);
    setBookTitle(book.title);
    setBookImageUrl(book.image);
    const catGroup = TEXTBOOK_CATEGORIES.find(c => c.series.includes(book.category))?.name;
    if (catGroup) {
      setCategoryGroup(catGroup);
      setBookCategory(book.category);
      setCustomBookCategory("");
    } else {
      setCategoryGroup("custom");
      setCustomCategoryGroup("Other");
      setBookCategory("custom");
      setCustomBookCategory(book.category);
    }
    setBookStd(book.std);
    setBookDescription(book.description);
    setBookIndex(book.index);
    setBookUploadMode("link");
    setBookUploadError(null);
    setShowBookForm(true);
    setTimeout(() => {
      document.getElementById("book-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteBook = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book from showcase?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Book deleted successfully!" });
        await fetchBooks();
      } else {
        setMessage({ type: "error", text: "Failed to delete book." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting book." });
    }
  };

  const resetBookForm = () => {
    setEditingBook(null);
    setBookTitle("");
    setBookImageUrl("");
    setCategoryGroup("Core Series");
    setBookCategory("Wings (S&T)");
    setCustomCategoryGroup("");
    setCustomBookCategory("");
    setBookStd("Grade 1");
    setBookDescription("");
    setBookIndex(0);
    setBookUploadMode("link");
    setBookUploadError(null);
    setBookUploadingFile(false);
    setShowBookForm(false);
  };

  const handleEditPosition = (pos: PositionItem) => {
    setEditingPosition(pos);
    setPosTitle(pos.title);
    setPosDept(pos.department);
    setPosType(pos.type);
    setPosDescription(pos.description);
    setPosRequirementsText(pos.requirements ? pos.requirements.join("\n") : "");
    setShowPositionForm(true);
  };

  const handlePositionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosSaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");

    const requirements = posRequirementsText
      .split("\n")
      .map((req) => req.trim())
      .filter((req) => req.length > 0);

    try {
      const url = editingPosition
        ? `${API_BASE_URL}/api/positions/${editingPosition._id}`
        : `${API_BASE_URL}/api/positions`;
      const method = editingPosition ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: posTitle,
          department: posDept,
          type: posType,
          description: posDescription,
          requirements,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingPosition
            ? "Career position updated successfully!"
            : "Career position created successfully!",
        });
        resetPositionForm();
        await fetchPositions();
      } else {
        setMessage({
          type: "error",
          text: data.message || `Failed to ${editingPosition ? "update" : "create"} career position.`,
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error saving position." });
    } finally {
      setPosSaving(false);
    }
  };

  const handleDeletePosition = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job position?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/positions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Position deleted successfully!" });
        await fetchPositions();
      } else {
        setMessage({ type: "error", text: "Failed to delete position." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting position." });
    }
  };

  const resetPositionForm = () => {
    setEditingPosition(null);
    setPosTitle("");
    setPosDept("Editorial & Content Development");
    setPosType("Full-Time / Hybrid");
    setPosDescription("");
    setPosRequirementsText("");
    setShowPositionForm(false);
  };

  // Book Series Outlines handlers
  const handleSeriesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeriesSaving(true);
    setMessage(null);
    const token = localStorage.getItem("adminToken");

    const bodyData = {
      name: seriesName,
      label: seriesLabel,
      classes: seriesClasses,
      gradient: seriesGradient,
      image: seriesImageUrl,
      index: Number(seriesIndex),
    };

    try {
      const url = editingSeries 
        ? `${API_BASE_URL}/api/book-outlines/${editingSeries._id}`
        : `${API_BASE_URL}/api/book-outlines`;
      const method = editingSeries ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ 
          type: "success", 
          text: editingSeries ? "Book series updated successfully!" : "Book series created successfully!" 
        });
        resetSeriesForm();
        await fetchBookSeries();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save book series." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error saving book series." });
    } finally {
      setSeriesSaving(false);
    }
  };

  const handleEditSeries = (series: BookSeriesItem) => {
    setEditingSeries(series);
    setSeriesName(series.name);
    setSeriesLabel(series.label);
    setSeriesClasses(series.classes);
    setSeriesGradient(series.gradient);
    setSeriesImageUrl(series.image || "");
    setSeriesIndex(series.index);
    setSeriesUploadMode("link");
    setShowSeriesForm(true);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById("series-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteSeries = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book series outline?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/book-outlines/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Book series deleted successfully!" });
        await fetchBookSeries();
      } else {
        setMessage({ type: "error", text: "Failed to delete book series." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting book series." });
    }
  };

  const handleSeriesFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSeriesUploadingFile(true);
    setSeriesUploadError(null);
    setMessage(null);

    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSeriesImageUrl(data.url);
        setMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        setSeriesUploadError(data.message || "Failed to upload image.");
        setMessage({ type: "error", text: data.message || "Failed to upload image." });
      }
    } catch (err) {
      console.error(err);
      setSeriesUploadError("Error uploading file to server.");
      setMessage({ type: "error", text: "Error uploading file to server." });
    } finally {
      setSeriesUploadingFile(false);
    }
  };

  const resetSeriesForm = () => {
    setEditingSeries(null);
    setSeriesName("");
    setSeriesLabel("");
    setSeriesClasses("");
    setSeriesGradient("from-blue-600 to-indigo-700");
    setSeriesImageUrl("");
    setSeriesIndex(0);
    setSeriesUploadMode("link");
    setSeriesUploadError(null);
    setShowSeriesForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-slate-500 font-semibold text-sm">Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">


      {/* Main Container with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* Left Side Sidebar Navigation */}
        <aside className="w-full md:w-[260px] bg-white border-r border-slate-200 p-6 flex flex-col gap-2 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-3">
            Core Features
          </div>
          
          {/* Overview Tab Button */}
          <button
            onClick={() => { setActiveTab("overview"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "overview"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Dashboard Overview
          </button>

          {/* Banner Tab Button */}
          <button
            onClick={() => { setActiveTab("banners"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "banners"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Slideshow Banners
          </button>

          {/* Offers Tab Button */}
          <button
            onClick={() => { setActiveTab("offers"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "offers"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.44 1.44 0 002.037 0l4.318-4.318a1.44 1.44 0 000-2.037l-9.58-9.581A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
            </svg>
            Promotional Offers
          </button>

          {/* Textbook Showcase Tab Button */}
          <button
            onClick={() => { setActiveTab("textbooks"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "textbooks"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25c-1.096-1.18-2.615-1.93-4.305-1.93L3 4.318v14.25l4.695-.008c1.69 0 3.209.75 4.305 1.93m0-14.25c1.096-1.18 2.615-1.93 4.305-1.93L21 4.318v14.25l-4.695-.008c-1.69 0-3.209.75-4.305 1.93m0-14.25v14.25" />
            </svg>
            Textbook Showcase
          </button>

          {/* Career Positions Tab Button */}
          <button
            onClick={() => { setActiveTab("positions"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "positions"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4V14.15m16.5 0c0-1.242-1.008-2.25-2.25-2.25H5.625c-1.242 0-2.25 1.008-2.25 2.25m16.5 0V7.5a2.25 2.25 0 00-2.25-2.25H5.625a2.25 2.25 0 00-2.25 2.25v6.65m14.25-6.65v11.75" />
            </svg>
            Career Positions
          </button>

          {/* Book Series Outlines Tab Button */}
          <button
            onClick={() => { setActiveTab("book-series"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "book-series"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Book Series Outlines
          </button>

          {/* Gallery Tab Button */}
          <button
            onClick={() => { setActiveTab("gallery"); setMessage(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
              activeTab === "gallery"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Gallery Images
          </button>
        </aside>

        {/* Right Side Content Panel */}
        <section className="flex-1 p-6 sm:p-10 overflow-y-auto">
          
          {/* Action Status Messages */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                message.type === "success"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : "bg-rose-50 border-rose-100 text-rose-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {message.type === "success" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                )}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage(null)} className="opacity-60 hover:opacity-100 text-[10px] font-bold">Close</button>
            </div>
          )}

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500 text-xs mt-1">Quick summary of site configuration and data indexes.</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* Banner Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Banners</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">{banners.length}</h3>
                  </div>
                  <div className="p-3.5 bg-blue-50 text-primary rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                </div>

                {/* Gallery Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Gallery Images</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">{galleryItems.length}</h3>
                  </div>
                  <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                </div>

                {/* Offer Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Offers</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                      {offers.filter(o => o.isActive).length} <span className="text-xs text-slate-400 font-semibold">/ {offers.length} total</span>
                    </h3>
                  </div>
                  <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.44 1.44 0 002.037 0l4.318-4.318a1.44 1.44 0 000-2.037l-9.58-9.581A2.25 2.25 0 009.568 3z" />
                    </svg>
                  </div>
                </div>

                {/* Book Outline features Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Outline Badges</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">{bookOutlines.length}</h3>
                  </div>
                  <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-16.25v14.25" />
                    </svg>
                  </div>
                </div>

                {/* Enquiries Stats Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Unread Enquiries</span>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                      {enquiries.filter(e => e.status === "New").length}
                    </h3>
                  </div>
                  <div className="p-3.5 bg-slate-100 text-slate-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Quick Guide */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xs">
                <h4 className="text-base font-extrabold text-slate-800 mb-4">Portal Manager Instructions</h4>
                <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-light">
                  <p>
                    Welcome to the **Child Craft Hallmark** management portal. Use the sidebar navigation on the left to toggle between different modules:
                  </p>
                  <ul className="list-disc list-inside space-y-2.5 pl-2">
                    <li>
                      <strong>Slideshow Banners:</strong> Add, edit, or remove images in the home slide carousel. A minimum of <strong>5 banners</strong> must be maintained. To delete a banner, ensure you have more than 5 in total.
                    </li>
                    <li>
                      <strong>Gallery Images:</strong> Upload new images or enter direct image links to add photos to the frontend gallery page. You can customize the order index and add titles to them.
                    </li>
                    <li>
                      <strong>Promotional Offers:</strong> Configure announcement bars and floating offers shown on the home page. You can have multiple offers saved, but only one can be active at a time.
                    </li>
                    <li>
                      <strong>Book Outlines Config:</strong> Adjust the features list displayed in the book preview outline panel (Mock integration).
                    </li>
                    <li>
                      <strong>Contact Enquiries:</strong> View callback submissions, specimen requests, and bulk order requests sent by educators (Mock panel).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BANNER MANAGER */}
          {activeTab === "banners" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manage Banner Images</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Configure home page 3D showcase banners. Maintaining at least 5 banners is required.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showBannerForm) {
                      resetBannerForm();
                    } else {
                      setShowBannerForm(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showBannerForm ? "Cancel" : "+ Add New Banner"}
                </button>
              </div>

              {/* Banner Create/Edit Form */}
              {showBannerForm && (
                <form
                  id="banner-form-anchor"
                  onSubmit={handleBannerSubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-5 max-w-2xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingBanner ? `Edit Banner (Slot index: ${editingBanner.index})` : "Add New Slide Image"}
                  </h3>
                  {/* Select Upload Method */}
                  <div className="flex border-b border-slate-100 pb-3 mb-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setUploadMode("link")}
                      className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                        uploadMode === "link"
                          ? "border-primary text-primary"
                          : "border-transparent text-slate-400 hover:text-slate-650"
                      }`}
                    >
                      Use Image Link / Path
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                        uploadMode === "file"
                          ? "border-primary text-primary"
                          : "border-transparent text-slate-400 hover:text-slate-650"
                      }`}
                    >
                      Upload Image (Cloudinary)
                    </button>
                  </div>

                  {uploadMode === "link" ? (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                        Image URL / Path
                      </label>
                      <input
                        type="text"
                        required
                        value={bannerImageUrl}
                        onChange={(e) => setBannerImageUrl(e.target.value)}
                        placeholder="e.g., /images/bookscover/newcover.jpg or https://cloudinary.com/..."
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                      />
                      <p className="text-[10px] text-slate-400 italic">
                        Tip: You can use local files under the static `/images` folder, or remote URLs.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">
                        Upload Image File
                      </label>
                      <div className="flex flex-col gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploadingFile}
                          className="text-xs text-slate-650 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all"
                        />
                        {uploadingFile && (
                          <div className="flex items-center gap-2 text-xs text-primary font-medium">
                            <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading image to Cloudinary...
                          </div>
                        )}
                        {uploadError && (
                          <div className="text-xs text-rose-600 font-semibold">{uploadError}</div>
                        )}
                        {bannerImageUrl && !uploadingFile && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Uploaded URL Preview:</span>
                            <div className="flex items-center gap-3">
                              <div className="relative w-16 h-12 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                                <img src={bannerImageUrl} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 truncate select-all">{bannerImageUrl}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={bannerSaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {bannerSaving ? "Saving..." : editingBanner ? "Save Changes" : "Create Banner"}
                    </button>
                    <button
                      type="button"
                      onClick={resetBannerForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Banners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((item, index) => {
                  const isEditingThis = editingBanner?._id === item._id;
                  const isSaving = savingIndex === item.index;

                  return (
                    <div
                      key={item._id}
                      className={`bg-white rounded-3xl p-5 border shadow-xs flex flex-col justify-between transition-all ${
                        isEditingThis ? "border-primary ring-2 ring-primary/10" : "border-slate-150"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-2.5 py-1 bg-primary/10 text-primary font-extrabold text-[10px] rounded-full">
                            Slot {index + 1}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">Order Index: {item.index}</span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-150 mb-4">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={`Banner ${item.index}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/bookscover/std1term1.jpeg";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                              No image path configured
                            </div>
                          )}
                        </div>

                        {/* Image Path display */}
                        <div className="space-y-1 mb-6">
                          <label className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
                            File Path
                          </label>
                          <div className="px-2.5 py-1.5 bg-slate-50 rounded-lg text-[10px] text-slate-600 font-mono truncate border border-slate-150">
                            {item.imageUrl}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleEditBanner(item)}
                          className="flex-1 py-2 border border-slate-200 hover:border-primary/30 hover:bg-slate-50 text-slate-700 hover:text-primary font-bold text-xs rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(item._id)}
                          disabled={banners.length <= 5}
                          className={`flex-1 py-2 border font-bold text-xs rounded-lg transition-all ${
                            banners.length <= 5
                              ? "border-slate-100 text-slate-300 bg-slate-50/50 cursor-not-allowed"
                              : "border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                          }`}
                          title={banners.length <= 5 ? "You must have at least 5 banners" : ""}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {banners.length <= 5 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-[11px] text-amber-700 font-medium">
                  Note: The delete options are currently disabled because there are exactly 5 banner images in the slideshow. Add another banner image first to enable the delete action.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROMOTIONAL OFFERS */}
          {activeTab === "offers" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manage Home Page Offers</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Add, edit, or toggle promotional banner announcements shown at the bottom of the home page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showOfferForm) {
                      resetOfferForm();
                    } else {
                      setShowOfferForm(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showOfferForm ? "Cancel" : "+ Create New Offer"}
                </button>
              </div>

              {/* Offer Create/Edit Form */}
              {showOfferForm && (
                <form
                  id="offer-form-anchor"
                  onSubmit={handleOfferSubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-6 max-w-3xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingOffer ? "Edit Promotional Offer" : "Create New Promotional Offer"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Tag / Label
                      </label>
                      <input
                        type="text"
                        required
                        value={offerTag}
                        onChange={(e) => setOfferTag(e.target.value)}
                        placeholder="e.g. 2026 Academic Season Offer"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Offer Title
                      </label>
                      <input
                        type="text"
                        required
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        placeholder="e.g. Partner with Us & Save up to 20%"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={offerDescription}
                      onChange={(e) => setOfferDescription(e.target.value)}
                      placeholder="Describe the offer details..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Button Text
                      </label>
                      <input
                        type="text"
                        required
                        value={offerBtnText}
                        onChange={(e) => setOfferBtnText(e.target.value)}
                        placeholder="e.g. Request Institutional Quote"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Button Link
                      </label>
                      <input
                        type="text"
                        required
                        value={offerBtnLink}
                        onChange={(e) => setOfferBtnLink(e.target.value)}
                        placeholder="e.g. /contact?ref=academic-offer"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="offerIsActive"
                      checked={offerIsActive}
                      onChange={(e) => setOfferIsActive(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary/20 border-slate-350 rounded"
                    />
                    <label htmlFor="offerIsActive" className="text-xs font-medium text-slate-700">
                      Activate this offer immediately (will deactivate any other active offer)
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={offerSaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {offerSaving ? "Saving..." : editingOffer ? "Update Offer" : "Save Offer"}
                    </button>
                    <button
                      type="button"
                      onClick={resetOfferForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Offers List */}
              <div className="bg-white rounded-3xl border border-slate-150 shadow-xs overflow-hidden">
                {offers.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No promotional offers created yet. Click "+ Create New Offer" above.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                          <th className="px-6 py-4">Tag / Label</th>
                          <th className="px-6 py-4">Title & Details</th>
                          <th className="px-6 py-4">CTA Button</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                        {offers.map((offerItem) => (
                          <tr key={offerItem._id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">
                                {offerItem.tag}
                              </span>
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                              <div className="font-extrabold text-slate-900">{offerItem.title}</div>
                              <div className="text-[11px] text-slate-400 truncate mt-0.5">{offerItem.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-[11px] bg-slate-50 border border-slate-150 inline-block px-2 py-1.5 rounded-md">
                                {offerItem.buttonText} &rarr; <span className="font-mono text-slate-400 text-[10px]">{offerItem.buttonLink}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleToggleActivation(offerItem._id, offerItem.isActive)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all shadow-xs ${
                                  offerItem.isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${offerItem.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
                                {offerItem.isActive ? "Active" : "Inactive"}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-2">
                              <button
                                onClick={() => startEditOffer(offerItem)}
                                className="px-3 py-1.5 text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 transition-all"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteOffer(offerItem._id)}
                                className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}



          {/* TAB 6: TEXTBOOK SHOWCASE */}
          {activeTab === "textbooks" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Textbook Showcase</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Manage textbooks, select syllabus categories (CBSE, ICSE, State Board), and assign classes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showBookForm) {
                      resetBookForm();
                    } else {
                      setShowBookForm(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showBookForm ? "Cancel" : "+ Add New Book"}
                </button>
              </div>

              {/* Book Create/Edit Form */}
              {showBookForm && (
                <form
                  id="book-form-anchor"
                  onSubmit={handleBookSubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-6 max-w-4xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingBook ? "Edit Textbook Details" : "Add New Textbook to Showcase"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Book Title
                      </label>
                      <input
                        type="text"
                        required
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="e.g. Wings Grade 1, Pearls Book 1"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Category Group
                      </label>
                      <select
                        value={categoryGroup}
                        onChange={(e) => {
                          setCategoryGroup(e.target.value);
                          if (e.target.value === "custom") {
                            setBookCategory("custom");
                          }
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      >
                        {TEXTBOOK_CATEGORIES.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                        <option value="custom">Other / Custom Category...</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Textbook Series Name
                      </label>
                      <select
                        value={bookCategory}
                        onChange={(e) => setBookCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      >
                        {categoryGroup !== "custom" && (TEXTBOOK_CATEGORIES.find(c => c.name === categoryGroup)?.series || []).map(seriesName => (
                          <option key={seriesName} value={seriesName}>{seriesName}</option>
                        ))}
                        <option value="custom">Other / Custom Series Name...</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Grade / Level
                      </label>
                      <select
                        value={bookStd}
                        onChange={(e) => setBookStd(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      >
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Kindergarten">Kindergarten</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditionally display custom inputs if "custom" is selected */}
                  {(categoryGroup === "custom" || bookCategory === "custom") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      {categoryGroup === "custom" && (
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                            Custom Category Group Title
                          </label>
                          <input
                            type="text"
                            required
                            value={customCategoryGroup}
                            onChange={(e) => setCustomCategoryGroup(e.target.value)}
                            placeholder="e.g. Higher Secondary, Pre-Primary"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                          />
                        </div>
                      )}

                      {bookCategory === "custom" && (
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                            Custom Textbook Series Name
                          </label>
                          <input
                            type="text"
                            required
                            value={customBookCategory}
                            onChange={(e) => setCustomBookCategory(e.target.value)}
                            placeholder="e.g. Explore the World, Fun Maths"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Order Index (Sorting Index)
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={bookIndex}
                        onChange={(e) => setBookIndex(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Image Selection Mode
                      </label>
                      <div className="flex border border-slate-150 p-1 rounded-xl bg-slate-50 w-full max-w-xs">
                        <button
                          type="button"
                          onClick={() => setBookUploadMode("link")}
                          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                            bookUploadMode === "link"
                              ? "bg-white text-primary shadow-xs"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Link/Path URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookUploadMode("file")}
                          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                            bookUploadMode === "file"
                              ? "bg-white text-primary shadow-xs"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Cloudinary Upload
                        </button>
                      </div>
                    </div>
                  </div>

                  {bookUploadMode === "link" ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Book Image URL or Static Path
                      </label>
                      <input
                        type="text"
                        required
                        value={bookImageUrl}
                        onChange={(e) => setBookImageUrl(e.target.value)}
                        placeholder="e.g. /images/bookscover/std1term1.jpeg or Cloudinary URL"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Upload Cover Image File
                      </label>
                      <div className="flex flex-col gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBookImageUpload}
                          disabled={bookUploadingFile}
                          className="text-xs text-slate-650 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all"
                        />
                        {bookUploadingFile && (
                          <div className="flex items-center gap-2 text-xs text-primary font-medium">
                            <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading image to Cloudinary...
                          </div>
                        )}
                        {bookUploadError && (
                          <div className="text-xs text-rose-600 font-semibold">{bookUploadError}</div>
                        )}
                        {bookImageUrl && !bookUploadingFile && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                            <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Uploaded URL Preview:</span>
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-16 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                                <img src={bookImageUrl} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 truncate select-all">{bookImageUrl}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                      placeholder="Enter a brief description of the book content and targets..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={bookSaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {bookSaving ? "Saving..." : editingBook ? "Update Book" : "Create Book"}
                    </button>
                    <button
                      type="button"
                      onClick={resetBookForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Books Grid */}
              <div className="bg-white rounded-3xl border border-slate-150 shadow-xs p-6 space-y-6">
                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Category:</span>
                    <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200 p-0.5 rounded-full">
                      {["All", "CBSE", "ICSE", "State Syllabus", "General"].map((cat) => {
                        const isSel = filterCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFilterCategory(cat)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                              isSel ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Class / Std:</span>
                    <select
                      value={filterStd}
                      onChange={(e) => setFilterStd(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs text-slate-800 font-bold"
                    >
                      <option value="All">All Standards</option>
                      <option value="Std 1">Std 1</option>
                      <option value="Std 2">Std 2</option>
                      <option value="Std 3">Std 3</option>
                      <option value="Std 4">Std 4</option>
                      <option value="Std 5">Std 5</option>
                      <option value="Std 6">Std 6</option>
                      <option value="Std 7">Std 7</option>
                      <option value="Std 8">Std 8</option>
                    </select>
                  </div>
                </div>

                {filteredBooks.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No textbooks found matching the selected filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
                      <div
                        key={book._id}
                        className="bg-white rounded-3xl p-5 border border-slate-150 shadow-xs flex flex-col justify-between hover:border-primary/20 hover:shadow-md transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-extrabold text-[9px] rounded-full uppercase">
                              {book.category}
                            </span>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary font-extrabold text-[9px] rounded-full">
                              {book.std}
                            </span>
                          </div>

                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-20 relative bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                              <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/bookscover/std1term1.jpeg";
                                }}
                              />
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              <h4 className="font-extrabold text-sm text-slate-800 leading-snug truncate">{book.title}</h4>
                              <p className="text-[10px] text-slate-400 font-mono">Index: {book.index}</p>
                              <p className="text-[11px] text-slate-500 line-clamp-3 leading-normal font-light">
                                {book.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => startEditBook(book)}
                            className="flex-1 py-1.5 border border-slate-200 hover:border-primary/30 hover:bg-slate-50 text-slate-750 hover:text-primary font-bold text-[11px] rounded-lg transition-all"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBook(book._id)}
                            className="flex-1 py-1.5 border border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-250 font-bold text-[11px] rounded-lg transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: CAREER POSITIONS */}
          {activeTab === "positions" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Open Career Positions</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Manage the job openings shown on the careers page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showPositionForm) {
                      resetPositionForm();
                    } else {
                      setShowPositionForm(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showPositionForm ? "Cancel" : "+ Add New Position"}
                </button>
              </div>

              {/* Position Create Form */}
              {showPositionForm && (
                <form
                  onSubmit={handlePositionSubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-6 max-w-4xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingPosition ? "Edit Career Position" : "Add New Career Position"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Position Title
                      </label>
                      <input
                        type="text"
                        required
                        value={posTitle}
                        onChange={(e) => setPosTitle(e.target.value)}
                        placeholder="e.g. Graphic Designer, Content Writer"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Department
                      </label>
                      <select
                        value={posDept}
                        onChange={(e) => setPosDept(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      >
                        <option value="Editorial & Content Development">Editorial & Content Development</option>
                        <option value="Creative & Book Design">Creative & Book Design</option>
                        <option value="Academic Support Services">Academic Support Services</option>
                        <option value="Administration & Sales">Administration & Sales</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Job Type
                      </label>
                      <select
                        value={posType}
                        onChange={(e) => setPosType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                      >
                        <option value="Full-Time / Hybrid">Full-Time / Hybrid</option>
                        <option value="Full-Time (In-office)">Full-Time (In-office)</option>
                        <option value="Full-Time (Requires Travel)">Full-Time (Requires Travel)</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={posDescription}
                      onChange={(e) => setPosDescription(e.target.value)}
                      placeholder="Brief summary of the job responsibilities and overview..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 animate-fade-in"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                      Key Requirements (One requirement per line)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={posRequirementsText}
                      onChange={(e) => setPosRequirementsText(e.target.value)}
                      placeholder="e.g.&#10;Degree in education or relevant field.&#10;Excellent communication skills.&#10;1+ years of experience."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={posSaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {posSaving ? "Saving..." : editingPosition ? "Update Position" : "Create Position"}
                    </button>
                    <button
                      type="button"
                      onClick={resetPositionForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Positions List */}
              <div className="bg-white rounded-3xl border border-slate-150 shadow-xs overflow-hidden">
                {positions.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs font-light">
                    No open positions created yet. Click &quot;+ Add New Position&quot; above.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                          <th className="px-6 py-4">Position Title</th>
                          <th className="px-6 py-4">Department</th>
                          <th className="px-6 py-4">Job Type</th>
                          <th className="px-6 py-4">Requirements</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                        {positions.map((pos) => (
                          <tr key={pos._id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-extrabold text-slate-900">
                              {pos.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                              {pos.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-sky-50 text-primary text-[10px] font-bold rounded-full uppercase">
                                {pos.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              {pos.requirements && pos.requirements.length > 0 && (
                                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 truncate">
                                  {pos.requirements.map((req, i) => (
                                    <li key={i} className="truncate">{req}</li>
                                  ))}
                                </ul>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-2">
                              <button
                                onClick={() => handleEditPosition(pos)}
                                className="px-3 py-1.5 text-primary hover:bg-sky-50 rounded-lg border border-transparent hover:border-sky-100 transition-all font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePosition(pos._id)}
                                className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all font-bold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: BOOK SERIES OUTLINES */}
          {activeTab === "book-series" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Book Series Outlines</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Manage the featured book series outlines shown on the homepage book section.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showSeriesForm) {
                      resetSeriesForm();
                    } else {
                      setShowSeriesForm(true);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showSeriesForm ? "Cancel" : "+ Add New Series"}
                </button>
              </div>

              {/* Series Create/Edit Form */}
              {showSeriesForm && (
                <form
                  id="series-form-anchor"
                  onSubmit={handleSeriesSubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-6 max-w-4xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingSeries ? "Edit Book Outline Image" : "Add New Book Outline Image"}
                  </h3>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Order Index (Sorting Position)
                      </label>
                      <input
                        type="number"
                        value={seriesIndex}
                        onChange={(e) => setSeriesIndex(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  {/* Upload Image Section */}
                  <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-150">
                    <div className="flex border-b border-slate-200 pb-2 mb-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setSeriesUploadMode("link")}
                        className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                          seriesUploadMode === "link" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Image Link / Path
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeriesUploadMode("file")}
                        className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                          seriesUploadMode === "file" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-650"
                        }`}
                      >
                        Upload Image (Cloudinary)
                      </button>
                    </div>

                    {seriesUploadMode === "link" ? (
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Image Path / URL</label>
                        <input
                          type="text"
                          required
                          value={seriesImageUrl}
                          onChange={(e) => setSeriesImageUrl(e.target.value)}
                          placeholder="e.g. /images/bookscover/newseries.jpg or Cloudinary URL"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSeriesFileUpload}
                          disabled={seriesUploadingFile}
                          className="text-xs text-slate-600 file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all"
                        />
                        {seriesUploadingFile && (
                          <div className="text-xs text-primary font-bold animate-pulse flex items-center gap-1.5">
                            Uploading to Cloudinary...
                          </div>
                        )}
                        {seriesUploadError && (
                          <div className="text-xs text-rose-600 font-bold">{seriesUploadError}</div>
                        )}
                      </div>
                    )}

                    {seriesImageUrl && (
                      <div className="flex items-center gap-3 mt-2 bg-white p-2.5 rounded-xl border border-slate-150">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <img src={seriesImageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 truncate select-all">{seriesImageUrl}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={seriesSaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {seriesSaving ? "Saving..." : editingSeries ? "Save Changes" : "Create Book Outline"}
                    </button>
                    <button
                      type="button"
                      onClick={resetSeriesForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Grid of Series Outlines */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bookSeriesList.map((series) => (
                  <div
                    key={series._id}
                    className="bg-white rounded-3xl border border-slate-150 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    {/* Visual Card Preview */}
                    <div className="p-4 bg-slate-55 flex items-center justify-center min-h-[220px] relative overflow-hidden bg-slate-50 border-b border-slate-100">
                      {series.image ? (
                        <img src={series.image} className="max-h-[190px] object-contain rounded-lg shadow-md" />
                      ) : (
                        <span className="text-slate-400 text-xs font-semibold">No Image Uploaded</span>
                      )}
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] text-slate-700 font-bold border border-slate-200">
                        Index: {series.index}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleEditSeries(series)}
                        className="flex-1 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSeries(series._id)}
                        className="flex-1 py-2 bg-rose-50 hover:bg-rose-100/80 border border-rose-100 hover:border-rose-200 text-rose-600 font-bold text-xs rounded-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: GALLERY MANAGEMENT */}
          {activeTab === "gallery" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manage Gallery Images</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Upload new images or enter direct image links to add photos to the frontend gallery page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (showGalleryForm) {
                      resetGalleryForm();
                    } else {
                      setShowGalleryForm(true);
                      const nextIdx = galleryItems.length > 0 ? Math.max(...galleryItems.map(i => i.index ?? 0)) + 1 : 0;
                      setGalleryIndex(nextIdx);
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  {showGalleryForm ? "Cancel" : "+ Add New Gallery Image"}
                </button>
              </div>

              {/* Gallery Create/Edit Form */}
              {showGalleryForm && (
                <form
                  id="gallery-form-anchor"
                  onSubmit={handleGallerySubmit}
                  className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-6 max-w-4xl"
                >
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingGalleryItem ? "Edit Gallery Image" : "Add New Gallery Image"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Title / Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Science Exhibition 2026"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-650 tracking-wider block">
                        Order Index (Sorting Position)
                      </label>
                      <input
                        type="number"
                        value={galleryIndex}
                        onChange={(e) => setGalleryIndex(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  {/* Upload Image Section */}
                  <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-150">
                    <div className="flex border-b border-slate-200 pb-2 mb-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setGalleryUploadMode("link")}
                        className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                          galleryUploadMode === "link" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Image Link / Path
                      </button>
                      <button
                        type="button"
                        onClick={() => setGalleryUploadMode("file")}
                        className={`pb-1 text-xs font-bold transition-all border-b-2 ${
                          galleryUploadMode === "file" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-650"
                        }`}
                      >
                        Upload Image (Cloudinary)
                      </button>
                    </div>

                    {galleryUploadMode === "link" ? (
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Image Path / URL</label>
                        <input
                          type="text"
                          required
                          value={galleryImageUrl}
                          onChange={(e) => setGalleryImageUrl(e.target.value)}
                          placeholder="e.g. /images/gallery/img1.jpeg or Cloudinary URL"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          disabled={galleryUploadingFile}
                          className="text-xs text-slate-655 file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all"
                        />
                        {galleryUploadingFile && (
                          <div className="text-xs text-primary font-bold animate-pulse flex items-center gap-1.5">
                            Uploading to Cloudinary...
                          </div>
                        )}
                        {galleryUploadError && (
                          <div className="text-xs text-rose-600 font-bold">{galleryUploadError}</div>
                        )}
                      </div>
                    )}

                    {galleryImageUrl && (
                      <div className="flex items-center gap-3 mt-2 bg-white p-2.5 rounded-xl border border-slate-150">
                        <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <img src={galleryImageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 truncate select-all">{galleryImageUrl}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={gallerySaving}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      {gallerySaving ? "Saving..." : editingGalleryItem ? "Save Changes" : "Add to Gallery"}
                    </button>
                    <button
                      type="button"
                      onClick={resetGalleryForm}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Grid of Gallery Images */}
              {galleryItems.length === 0 ? (
                <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-500 text-sm font-semibold">No custom gallery images uploaded yet.</p>
                  <p className="text-slate-400 text-xs mt-1">The frontend page will display default preset images until you add some.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-3xl border border-slate-150 shadow-xs overflow-hidden flex flex-col justify-between"
                    >
                      {/* Visual Card Preview */}
                      <div className="p-4 bg-slate-50 flex items-center justify-center min-h-[200px] relative overflow-hidden border-b border-slate-100">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} className="max-h-[170px] max-w-full object-contain rounded-lg shadow-sm" />
                        ) : (
                          <span className="text-slate-400 text-xs font-semibold">No Image</span>
                        )}
                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] text-slate-700 font-bold border border-slate-200">
                          Index: {item.index}
                        </div>
                      </div>

                      {item.title && (
                        <div className="px-4 pt-3 text-xs font-bold text-slate-700 truncate">
                          {item.title}
                        </div>
                      )}

                      <div className="p-4 flex items-center justify-between gap-3">
                        <button
                          onClick={() => startEditGallery(item)}
                          className="flex-1 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item._id)}
                          className="flex-1 py-2 bg-rose-50 hover:bg-rose-100/80 border border-rose-100 hover:border-rose-200 text-rose-600 font-bold text-xs rounded-xl transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
