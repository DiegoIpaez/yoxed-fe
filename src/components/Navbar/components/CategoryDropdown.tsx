import React, { useEffect, useState } from "react";
import type { Category } from "@/models";
import Link from "next/link";
import { Navbar, NavDropdown } from "react-bootstrap";
import { getCategorias } from "@/services";

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categorias } = await getCategorias();
        setCategories(categorias);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  return (
    <Navbar.Brand>
      <NavDropdown
        title={<i className="fas fa-list-ul text-white"></i>}
        id="collasible-nav-dropdown"
      >
        {categories.map((category) => (
          <NavDropdown.Item
            as={Link}
            href={`/category/${category._id}`}
            key={category._id}
          >
            {category.nombre}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Navbar.Brand>
  );
};
