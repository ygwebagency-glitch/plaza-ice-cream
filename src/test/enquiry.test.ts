import { describe, expect, it } from "vitest";
import { validateEnquiry } from "@/components/EnquiryForm";

const ok = { name: "Jo", email: "jo@example.com", phone: "07723 324454", type: "Wedding", message: "" };

describe("enquiry validation", () => {
  it("accepts a complete enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("requires an event type", () => expect(validateEnquiry({ ...ok, type: "" }).type).toBe("Please choose an event type."));
  it("rejects messages over 1000 characters", () =>
    expect(validateEnquiry({ ...ok, message: "a".repeat(1001) }).message).toBe("Please keep your message under 1000 characters."));
});
