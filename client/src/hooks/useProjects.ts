import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

export function useAllProjects() {
  return useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
}

export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });
}

export function useProjectsByCategory(category: string) {
  return useQuery<Project[]>({
    queryKey: ["/api/projects/category", category],
  });
}

export function useProject(id: number) {
  return useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  });
}
