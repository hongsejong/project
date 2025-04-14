package edu.kh.haezo.inquiry.model.dto;
public class PaginationInquiry {

    private int currentPage;  
    private int listCount;    
    private int limit;        
    private int pageSize = 10; 

    private int maxPage;      
    private int startPage;    
    private int endPage;      
    private int prevPage;     
    private int nextPage;     

    public PaginationInquiry(int currentPage, int listCount, int limit) {
        this.currentPage = currentPage;
        this.listCount = listCount;
        this.limit = limit;
        calculatePagination();
    }











	private void calculatePagination() {
        maxPage = (int) Math.ceil((double) listCount / limit);

        startPage = (currentPage - 1) / pageSize * pageSize + 1;
        endPage = startPage + pageSize - 1;

        if (endPage > maxPage) endPage = maxPage;

        prevPage = (currentPage <= pageSize) ? 1 : startPage - 1;
        nextPage = (endPage >= maxPage) ? maxPage : endPage + 1;
    }

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getListCount() {
		return listCount;
	}

	public void setListCount(int listCount) {
		this.listCount = listCount;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getMaxPage() {
		return maxPage;
	}

	public void setMaxPage(int maxPage) {
		this.maxPage = maxPage;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}



	@Override
	public String toString() {
		return "PaginationInquiry [currentPage=" + currentPage + ", listCount=" + listCount + ", limit=" + limit
				+ ", pageSize=" + pageSize + ", maxPage=" + maxPage + ", startPage=" + startPage + ", endPage="
				+ endPage + ", prevPage=" + prevPage + ", nextPage=" + nextPage + "]";
	}


}
